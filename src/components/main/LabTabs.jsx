import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { useSelector } from "react-redux";
import axios from "axios";

export default function LabTabs() {
  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const [category, setCategory] = useState(
    localStorage.getItem("selectedCategory") || "all-products"
  );
  const searchQuery = useSelector((state) => state.products.searchQuery);

  useEffect(() => {
    localStorage.setItem("selectedCategory", category);
  }, [category]);

  const handleChange = (e, newCategory) => setCategory(newCategory);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(
          "https://dummyjson.com/products/category-list"
        );
        setCategories(["all-products", ...data]);
      } catch (err) {
        console.error("Axios request failed:", err);
      }
    }

    getCategories();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (category === "all-products" || p.category === category) &&
      p.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  if (status === "loading")
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (status === "failed")
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          Failed to load products. Please try again.
        </Alert>
      </Box>
    );

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={category}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ maxWidth: 800, width: "100%" }}>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              {categories.map((cat) => (
                <Tab key={cat} label={cat} value={cat} />
              ))}
            </TabList>
          </Box>
        </Box>

        <TabPanel value={category}>
          <ProductsGrid filteredProducts={filteredProducts} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
