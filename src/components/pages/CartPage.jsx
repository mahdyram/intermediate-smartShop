import { useSelector, useDispatch } from "react-redux";
import Header from "../header/Header";
import {
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {
  addToCart,
  clearCart,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.carts
  );

  return (
    <div className="cartPage">
      <Header />
      <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
        {items.length === 0 ? (
          <Typography variant="h6" align="center">
            Cart is empty
          </Typography>
        ) : (
          <>
            {items.map((c) => (
              <Card
                key={c.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  p: 1,
                }}
              >
                {/* Product Image */}
                <CardMedia
                  component="img"
                  image={c.thumbnail}
                  alt={c.title}
                  sx={{ width: 80, height: 80, borderRadius: 2 }}
                />

                {/* Text and Price */}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{c.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unit Price: {c.price} $
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    Total: {(c.price * c.quantity).toFixed(2)} $
                  </Typography>
                </CardContent>

                {/* Quantity Control */}
                <div>
                  <IconButton
                    color="primary"
                    onClick={() => dispatch(addToCart(c))}
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography component="span" sx={{ mx: 1 }}>
                    {c.quantity}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => dispatch(decrementQuantity(c.id))}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>

                {/* Remove Product */}
                <IconButton
                  color="error"
                  onClick={() => dispatch(removeFromCart(c.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}

            <Divider sx={{ my: 3 }} />

            {/* Total Summary */}
            <Typography
              variant="h6"
              align="left"
              sx={{
                fontWeight: "bold",
                color: "#00152d",
                mb: 1,
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              Total Items: {totalQuantity}
            </Typography>

            <Typography
              variant="h6"
              align="left"
              sx={{
                fontWeight: "bold",
                color: "#00152d",
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              Total Price: {totalPrice.toFixed(2)} $
            </Typography>

            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteSweepIcon />}
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
