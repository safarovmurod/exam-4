import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { getCart, resetCart } from "../store/korzina";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { removeToken } from "../token/token";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) dispatch(getCart());
  }, [dispatch, isLoggedIn]);

  function logout() {
    removeToken();
    dispatch(resetCart());
    navigate("/login");
  }

  if (!isLoggedIn && pathname !== "/login" && pathname !== "/signup") return <Navigate to="/login" replace />;
  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) return <Navigate to="/home" replace />;

  return (
    <div id="top" className="flex min-h-[100vh] flex-col">
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />
      <main className={pathname === "/home" ? "" : "flex-1"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
