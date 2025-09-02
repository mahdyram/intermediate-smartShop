import { useParams } from "react-router-dom";
import CartButton from "../header/CartButton";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { addToCart, decrementQuantity } from "../../redux/cartSlice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => p.id == id);
  const { title, price, brand, stock, rating, description, thumbnail, images } =
    product;
  const cartItems = useSelector((state) => state.carts.items);
  const cartItem = cartItems.find((i) => i.id == id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="productPage">
      <Header>
        <CartButton />
      </Header>

      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          mb: 2,
        }}
      >
        <Card
          sx={{
            width: { xs: "90%", sm: 450 },
            minHeight: 600,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            height={400}
            image={images && images.length ? images[0] : thumbnail}
            alt={title}
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Brand: {brand} | Rating: {rating} ⭐ | Stock: {stock}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              ${price}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
              {description}
            </Typography>
          </CardContent>

          <CardActions sx={{ m: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: 100,
                height: 35,
                borderRadius: 1,
                backgroundColor: "#1976d2",
              }}
            >
              <Button
                size="small"
                onClick={() => dispatch(decrementQuantity(product.id))}
                disabled={quantity === 0}
                sx={{ color: "white", fontSize: "1.5rem" }}
              >
                -
              </Button>

              <Box
                sx={{
                  px: 2,
                  textAlign: "center",
                  color: "white",
                  fontSize: "1.1rem",
                }}
              >
                {quantity}
              </Box>

              <Button
                size="small"
                onClick={() => dispatch(addToCart(product))}
                sx={{ color: "white", fontSize: "1.2rem" }}
              >
                +
              </Button>
            </Box>

            <Button
              variant="outlined"
              component={Link}
              to="/"
              sx={{
                minWidth: 150,
              }}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
