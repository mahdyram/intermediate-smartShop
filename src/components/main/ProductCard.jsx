import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Badge from "@mui/material/Badge";

export default function ProductCard(product) {
  const { id, title, price, thumbnail } = product;
  const dispatch = useDispatch();
  const items = useSelector((state) => state.carts.items);
  const existingItem = items.find((i) => i.id == id);
  const quantity = existingItem ? existingItem.quantity : 0;

  return (
    <Card
      sx={{
        height: 440,
        width: 310,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia sx={{ height: 300 }} image={thumbnail} title={title} />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          $ {price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => dispatch(addToCart(product))}>
          <Badge badgeContent={quantity} color="primary">
            <AddShoppingCartIcon />
          </Badge>
        </Button>

        <Button size="small" component={Link} to={`/product/${id}`}>
          <OpenInNewIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
