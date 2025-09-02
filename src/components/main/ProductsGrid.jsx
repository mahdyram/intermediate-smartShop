import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ filteredProducts }) {
  const [page, setPage] = useState(
    Number(localStorage.getItem("selectedPage")) || 1
  );

  const didMount = useRef(false);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    localStorage.setItem("selectedPage", page);
  }, [page]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (didMount.current) {
      setPage(1);
    } else {
      didMount.current = true;
    }
  }, [filteredProducts]);

  const currentProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3} justifyContent="space-around">
        {currentProducts.map((product) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={product.id}
            display="flex"
            justifyContent="center"
          >
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
