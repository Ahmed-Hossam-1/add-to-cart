import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "./FormatCurency";

const CartItem = ({ id, quantity }) => {
  const { products, removeItemFromCart } = useShoppingCart();
  const items = products.find((item) => item.id === id);
  if (items == null) return null;
  return (
    <Stack direction="horizontal" className="d-flex align-items-center" g={2}>
      <img
        src={items.image}
        alt="NON"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {items.category}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
            {formatCurrency(items.price)}
          </div>
        </div>
      </div>
      <div className="me-1">{formatCurrency(items.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeItemFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
