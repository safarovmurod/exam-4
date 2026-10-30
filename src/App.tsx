import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Products from "./Pages/Products";
import Wishlist from "./Pages/Wishlist";
import ProductDetails from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import Account from "./Pages/Account";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "checkout", element: <Checkout /> },
      { path: "cart", element: <Cart /> },
      { path: "account", element: <Account /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Auth /> },
      { path: "signup", element: <Auth /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
