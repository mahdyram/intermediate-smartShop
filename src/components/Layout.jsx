import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import ScrollToTop from "./ScrollToTop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { fetchCategories } from "../redux/categorySlice";

export default function Layout() {
  const dispatch = useDispatch();
  const cStatus = useSelector((state) => state.categories.status);
  const pStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    if (cStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [cStatus, dispatch]);

  useEffect(() => {
    if (pStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [pStatus, dispatch]);

  return (
    <div className="layout">
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
}
