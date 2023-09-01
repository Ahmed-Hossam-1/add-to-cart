import React from "react";
import { Button, Card } from "react-bootstrap";
import formatCurrency from "./FormatCurency";
import { useShoppingCart } from "../context/ShoppingCartContext";

const StoreItem = ({ id, category, price, image }) => {
  const {
    increaseCartQuantity,
    getItemsQuantity,
    decreaseCartQuantity,
    removeItemFromCart,
  } = useShoppingCart();
  const quantity = getItemsQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        src={image}
        variant="top"
        style={{ width: "100%", height: "200px", background: "cover" }}
      />
      <Card.Body style={{ backgroundColor: "whitesmoke" }}>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className="fs-5 mb-2 mt-2">{category}</span>
          <span className="text-muted me-2">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button onClick={() => increaseCartQuantity(id)} className="w-100">
              Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  gap: "0.5rem",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <span className="fs-3">{quantity} In Cart</span>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeItemFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
