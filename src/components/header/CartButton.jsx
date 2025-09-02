import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartButton() {
  const { totalQuantity } = useSelector((state) => state.carts);

  return (
    <IconButton color="inherit" component={Link} to="/cart">
      <Badge badgeContent={totalQuantity} color="error">
        <ShoppingCartIcon sx={{ fontSize: 40 }} />
      </Badge>
    </IconButton>
  );
}
