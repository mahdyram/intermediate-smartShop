import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import ScrollToTop from "./ScrollToTop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="layout">
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
}
