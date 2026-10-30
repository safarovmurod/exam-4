import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StatCards from "../components/Dashboard/StatCards";
import RevenueChart from "../components/Dashboard/RevenueChart";
import TopSellingProducts from "../components/Dashboard/TopSellingProducts";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import RecentUsers from "../components/Dashboard/RecentUsers";
import { getProducts } from "../store/productSlice";
import { getCategories } from "../store/categorySlice";
import { getBrands } from "../store/brandSlice";
import { getUserProfiles } from "../store/userSlice";
import type { AppDispatch, RootState } from "../store/store";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.product.products);
  const categories = useSelector((state: RootState) => state.category.categories);
  const brands = useSelector((state: RootState) => state.brand.brands);
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getUserProfiles());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-[28px]">
      <h1 className="text-[26px] font-[700] text-[#0f172a]">Dashboard</h1>

      <StatCards
        productsCount={products.length}
        categoriesCount={categories.length}
        brandsCount={brands.length}
        usersCount={users.length}
      />

      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        <RevenueChart />
        <TopSellingProducts products={products} />
      </div>

      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        <RecentTransactions />
        <RecentUsers users={users} />
      </div>
    </div>
  );
}
