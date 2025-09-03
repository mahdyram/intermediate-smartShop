import CircularProgress from "@mui/material/CircularProgress";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Alert from "@mui/material/Alert";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import ProductsGrid from "./ProductsGrid";
import { setCategory } from "../../redux/categorySlice";

export default function LabTabs() {
  const dispatch = useDispatch();
  const { items: categories, selected: category } = useSelector(
    (state) => state.categories
  );
  const {
    searchQuery,
    items: products,
    status: pStatus,
  } = useSelector((state) => state.products);

  const handleChange = (e, newCategory) => dispatch(setCategory(newCategory));

  const filteredProducts = products.filter(
    (p) =>
      (category === "all-products" || p.category === category) &&
      p.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  if (pStatus === "loading")
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (pStatus === "failed")
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
