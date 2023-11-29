import Header from "../components/Header";
import Products from "../components/product/Products";
const ProductsPage = () => {
  return (
    <>
      <Header />
      <div
        className="d-flex align-items-center justify-content-center flex-column "
        style={{
          marginTop: "80px",
          //  background: "red"
        }}
      >
        <h2>Products</h2>
        <Products />
      </div>
    </>
  );
};

export default ProductsPage;
