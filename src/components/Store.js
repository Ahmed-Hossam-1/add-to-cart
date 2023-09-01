import React from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "./StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Store = () => {
  const { products } = useShoppingCart();

  return (
    <>
      <h1>Store</h1>
      <Row
        // md={2}
        // xs={1}
        // lg={3}
        className="g-3"
        style={{
          display: "grid",
          gridTemplateColumns: " repeat(auto-fill,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        {products.map((product) => (
          <Col key={product.id}>
            <StoreItem {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
