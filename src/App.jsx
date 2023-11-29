import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Cart";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ProductsPage from "./pages/ProductsPage";

// context
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import AdminPage from "./pages/Admin/AdminPage";

export const CartContext = createContext({
  cart: [],
  setCart: () => {},
  countProduct: 0,
  setCountProduct: () => {},
});
export const UserContext = createContext({
  user: {},
  setUser: () => {},
});
export const ProductsContext = createContext({
  products: [],
});

function App() {
  const [cart, setCart] = useState([]);
  const [countProduct, setCountProduct] = useState(0);
  const [user, setUser] = useState({});

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/product/all")
      .then((result) => {
        console.log(result.data);
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ProductsContext.Provider value={{ products, setProducts }}>
        <UserContext.Provider value={{ user, setUser }}>
          <CartContext.Provider
            value={{ cart, setCart, countProduct, setCountProduct }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/aboutUs" element={<About />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </CartContext.Provider>
        </UserContext.Provider>
      </ProductsContext.Provider>
    </>
  );
}

export default App;
