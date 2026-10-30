import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  type Product,
} from "../store/productSlice";
import { getCategories } from "../store/categorySlice";
import { getBrands } from "../store/brandSlice";
import { getColors } from "../store/colorSlice";
import ProductsHeader from "../components/Products/ProductsHeader";
import ProductsFilters from "../components/Products/ProductsFilters";
import ProductsTable from "../components/Products/ProductsTable";
import AddProductModal from "../components/Products/AddProductModal";
import EditProductModal from "../components/Products/EditProductModal";
import DeleteProductModal from "../components/Products/DeleteProductModal";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, currentProduct, isLoading, isSaving, error } = useSelector(
    (state: RootState) => state.product
  );
  const { categories } = useSelector((state: RootState) => state.category);
  const { brands } = useSelector((state: RootState) => state.brand);
  const { colors } = useSelector((state: RootState) => state.color);

  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [urlSearch]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getColors());
  }, [dispatch]);

  async function handleAddSave(fd: FormData) {
    try {
      const res = await dispatch(addProduct(fd));
      return Boolean(res.payload);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function handleEditSave(payload: any) {
    try {
      const res = await dispatch(updateProduct(payload));
      if (res.payload) {
        return { success: true };
      }
      return {
        success: false,
        error: "Хатогӣ ҳангоми навсозӣ",
      };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        error: error?.message || "Хатогӣ рӯй дод",
      };
    }
  }

  async function handleDeleteConfirm() {
    if (!selectedProduct) return;
    try {
      await dispatch(deleteProduct(selectedProduct.id));
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleOpenEdit(prod: Product) {
    await dispatch(getProductById(prod.id));
    setSelectedProduct(prod);
    setIsEditOpen(true);
  }

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || String(prod.categoryId) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-[24px]">
      <ProductsHeader
        totalCount={products.length}
        onOpenAdd={() => setIsAddOpen(true)}
      />

      {error && (
        <div className="bg-[#fee2e2] border border-[#ef4444] text-[#b91c1c] text-[14px] p-[12px] rounded-[8px]">
          {error}
        </div>
      )}

      <ProductsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <ProductsTable
        products={filteredProducts}
        isLoading={isLoading}
        onOpenAdd={() => setIsAddOpen(true)}
        onOpenEdit={handleOpenEdit}
        onOpenDelete={(prod) => {
          setSelectedProduct(prod);
          setIsDeleteOpen(true);
        }}
      />

      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        categories={categories}
        brands={brands}
        colors={colors}
        isSaving={isSaving}
        onSave={handleAddSave}
      />

      {selectedProduct && (
        <EditProductModal
          product={currentProduct?.id === selectedProduct.id ? currentProduct : selectedProduct}
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedProduct(null);
          }}
          categories={categories}
          brands={brands}
          colors={colors}
          isSaving={isSaving}
          onSave={handleEditSave}
        />
      )}

      {selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedProduct(null);
          }}
          isSaving={isSaving}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
