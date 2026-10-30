import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  type Category,
} from "../store/categorySlice";
import {
  addSubCategory,
  deleteSubCategory,
} from "../store/subCategorySlice";
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  type Brand,
} from "../store/brandSlice";
import OtherTabs from "../components/Other/OtherTabs";
import CategoryCards from "../components/Other/CategoryCards";
import AddCategoryModal from "../components/Other/AddCategoryModal";
import EditCategoryModal from "../components/Other/EditCategoryModal";
import DeleteCategoryModal from "../components/Other/DeleteCategoryModal";
import AddSubCategoryModal from "../components/Other/AddSubCategoryModal";
import BrandsTable from "../components/Other/BrandsTable";
import AddBrandModal from "../components/Other/AddBrandModal";
import EditBrandModal from "../components/Other/EditBrandModal";
import DeleteBrandModal from "../components/Other/DeleteBrandModal";

export default function Other() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading: isCatLoading, isSaving: isCatSaving, error: catError } =
    useSelector((state: RootState) => state.category);
  const { brands, isLoading: isBrandLoading, isSaving: isBrandSaving, error: brandError } =
    useSelector((state: RootState) => state.brand);
  const { error: subCatError } = useSelector((state: RootState) => state.subCategory);

  const error = catError || brandError || subCatError;

  const [activeTab, setActiveTab] = useState<"categories" | "brands">("categories");

  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [isEditCatOpen, setIsEditCatOpen] = useState(false);
  const [isDeleteCatOpen, setIsDeleteCatOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);

  const [isAddSubOpen, setIsAddSubOpen] = useState(false);
  const [selectedCatForSub, setSelectedCatForSub] = useState<Category | null>(null);

  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);
  const [isEditBrandOpen, setIsEditBrandOpen] = useState(false);
  const [isDeleteBrandOpen, setIsDeleteBrandOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  async function handleAddCategory(fd: FormData) {
    try {
      const res = await dispatch(addCategory(fd));
      return Boolean(res.payload);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function handleEditCategory(fd: FormData) {
    try {
      const res = await dispatch(updateCategory(fd));
      return Boolean(res.payload);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function handleDeleteCategory() {
    if (!selectedCat) return;
    try {
      await dispatch(deleteCategory(selectedCat.id));
      setIsDeleteCatOpen(false);
      setSelectedCat(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddSubCategory(payload: {
    categoryId: number;
    subCategoryName: string;
  }) {
    try {
      const res = await dispatch(addSubCategory(payload));
      return Boolean(res.payload);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function handleDeleteSub(subId: number) {
    try {
      await dispatch(deleteSubCategory(subId));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddBrand(name: string) {
    try {
      const res = await dispatch(addBrand(name));
      return Boolean(res.payload);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function handleEditBrand(payload: { id: number; brandName: string }) {
    try {
      const res = await dispatch(updateBrand(payload));
      return Boolean(res.payload);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function handleDeleteBrand() {
    if (selectedBrand) {
      await dispatch(deleteBrand(selectedBrand.id));
      setIsDeleteBrandOpen(false);
      setSelectedBrand(null);
    }
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <OtherTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        categoriesCount={categories.length}
        brandsCount={brands.length}
        onOpenAddCat={() => setIsAddCatOpen(true)}
        onOpenAddBrand={() => setIsAddBrandOpen(true)}
      />

      {error && (
        <div className="bg-[#fee2e2] border border-[#ef4444] text-[#b91c1c] text-[14px] p-[12px] rounded-[8px]">
          {error}
        </div>
      )}

      {activeTab === "categories" ? (
        <CategoryCards
          categories={categories}
          isLoading={isCatLoading}
          onOpenEditCat={(cat) => {
            setSelectedCat(cat);
            setIsEditCatOpen(true);
          }}
          onOpenDeleteCat={(cat) => {
            setSelectedCat(cat);
            setIsDeleteCatOpen(true);
          }}
          onOpenAddSub={(cat) => {
            setSelectedCatForSub(cat);
            setIsAddSubOpen(true);
          }}
          onDeleteSub={handleDeleteSub}
        />
      ) : (
        <BrandsTable
          brands={brands}
          isLoading={isBrandLoading}
          onOpenEditBrand={(b) => {
            setSelectedBrand(b);
            setIsEditBrandOpen(true);
          }}
          onOpenDeleteBrand={(b) => {
            setSelectedBrand(b);
            setIsDeleteBrandOpen(true);
          }}
        />
      )}

      <AddCategoryModal
        isOpen={isAddCatOpen}
        onClose={() => setIsAddCatOpen(false)}
        isSaving={isCatSaving}
        onSave={handleAddCategory}
      />

      {selectedCat && (
        <EditCategoryModal
          category={selectedCat}
          isOpen={isEditCatOpen}
          onClose={() => {
            setIsEditCatOpen(false);
            setSelectedCat(null);
          }}
          isSaving={isCatSaving}
          onSave={handleEditCategory}
        />
      )}

      {selectedCat && (
        <DeleteCategoryModal
          category={selectedCat}
          isOpen={isDeleteCatOpen}
          onClose={() => {
            setIsDeleteCatOpen(false);
            setSelectedCat(null);
          }}
          isSaving={isCatSaving}
          onConfirm={handleDeleteCategory}
        />
      )}

      {selectedCatForSub && (
        <AddSubCategoryModal
          category={selectedCatForSub}
          isOpen={isAddSubOpen}
          onClose={() => {
            setIsAddSubOpen(false);
            setSelectedCatForSub(null);
          }}
          onSave={handleAddSubCategory}
        />
      )}

      <AddBrandModal
        isOpen={isAddBrandOpen}
        onClose={() => setIsAddBrandOpen(false)}
        isSaving={isBrandSaving}
        onSave={handleAddBrand}
      />

      {selectedBrand && (
        <EditBrandModal
          brand={selectedBrand}
          isOpen={isEditBrandOpen}
          onClose={() => {
            setIsEditBrandOpen(false);
            setSelectedBrand(null);
          }}
          isSaving={isBrandSaving}
          onSave={handleEditBrand}
        />
      )}

      {selectedBrand && (
        <DeleteBrandModal
          brand={selectedBrand}
          isOpen={isDeleteBrandOpen}
          onClose={() => {
            setIsDeleteBrandOpen(false);
            setSelectedBrand(null);
          }}
          isSaving={isBrandSaving}
          onConfirm={handleDeleteBrand}
        />
      )}
    </div>
  );
}
