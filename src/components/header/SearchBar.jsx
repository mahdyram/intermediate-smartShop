import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/productSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.products.searchQuery);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.25)" },
        borderRadius: 1,
        width: "100%",
        maxWidth: { xs: 300, sm: 400 },
        height: { xs: 45, md: 50 },
        px: 1,
        mt: 0.5,
        mr: 8,
      }}
    >
      <IconButton sx={{ p: 0, mr: 1, color: "white" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search products…"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        endAdornment={
          searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => dispatch(setSearchQuery(""))}
                sx={{ color: "white" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{ flex: 1, color: "white" }}
      />
    </Box>
  );
}
