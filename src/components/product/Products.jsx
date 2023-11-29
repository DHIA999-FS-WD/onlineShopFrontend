import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import products from "../../data";
import { useEffect, useContext } from "react";
import { CartContext, ProductsContext } from "../../App";

const Products = () => {
  const { products } = useContext(ProductsContext);
  const {
    cart = [],
    setCart,
    countProduct,
    setCountProduct,
  } = useContext(CartContext);

  const addToCart = (p) => {
    const data = [...cart];

    const existingProduct = data.find((item) => item.id === p._id);

    if (existingProduct) {
      // increment its count by 1 if the product already exists in the cart
      existingProduct.count += 1;
    } else {
      // if the product doesn't exist add it to the cart with count 1
      const product = {
        id: p._id,
        count: 1,
        img: p.img,
        title: p.title,
        prix: p.prix,
      };
      data.push(product);
    }
    setCart(data);
    let totalProduct = countProduct + 1;
    setCountProduct(totalProduct);
  };
  useEffect(() => {
    console.log(cart);
    console.log("totalProduct:", countProduct);
  }, [cart, countProduct]);
  return (
    <div className="d-flex   align-items-center justify-content-center flex-wrap ">
      {products.map((item) => (
        <Card key={item._id} style={{ width: "18rem" }} className="me-3">
          <Card.Img variant="top" src={item.img} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.desc}</Card.Text>
            <Card.Text>Prix:1{item.prix}$</Card.Text>
            <Button variant="primary" onClick={() => addToCart(item)}>
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Products;
