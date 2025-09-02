import { createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./components/main/Main";
import CartPage from "./components/pages/CartPage";
import ProductPage from "./components/pages/ProductPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "cart", element: <CartPage /> },
      { path: "product/:id", element: <ProductPage /> },
    ],
  },
]);
