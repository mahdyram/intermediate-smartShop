import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link, useLocation } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Logo() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const homePath = location.pathname === "/";

  const hideElement = isMobile && homePath;
  if (hideElement) return null;

  return (
    <Box
      sx={{
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
      }}
      component={Link}
      to="/"
    >
      <StorefrontIcon sx={{ fontSize: 36, color: "primary.main", mr: 1 }} />
      <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
        SmartShop
      </Typography>
    </Box>
  );
}
