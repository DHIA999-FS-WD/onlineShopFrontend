import { FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsCart4 } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { UserContext, CartContext } from "../App";
const Header = () => {
  const { countProduct } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const [newUser, setNewName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setNewName(parseData);
    }
  }, []);
  const handleLogout = () => {
    // Clear user data and reload the page
    setUser({});
    localStorage.removeItem("auth");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="fixed-top"
      >
        <Container>
          <Navbar.Brand className="me-5">
            <Link
              className="link-light text-decoration-none d-flex align-items-center"
              to="/"
            >
              <FiShoppingBag className="me-1" />
              OnlineShop
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto ">
              <Link
                className="me-2 link-light text-decoration-none"
                to="/products"
              >
                Products
              </Link>
              <Link
                className="me-2 link-light text-decoration-none"
                to="/aboutUs"
              >
                AboutUs
              </Link>

              <Link
                className="me-2 link-light text-decoration-none"
                to="/contactUs"
              >
                Contact Us
              </Link>
              {Object.keys(newUser).length !== 0 &&
              newUser.role !== 0 &&
              newUser.token != "" ? (
                <>
                  <Link
                    className="me-2 link-light text-decoration-none"
                    to="/admin"
                  >
                    Admin
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="me-2 link-light text-decoration-none"
                    to="/cart"
                  >
                    <BsCart4 />({countProduct})
                  </Link>
                </>
              )}
            </Nav>
            <Nav>
              {Object.keys(user).length !== 0 ? (
                <>
                  <div className="me-3 link-light text-decoration-none">
                    {newUser.name}
                  </div>
                  <div
                    className="me-3 link-light text-decoration-none"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link
                    className="me-3 link-light text-decoration-none"
                    to="/Register"
                  >
                    Register
                  </Link>
                  <Link
                    className="me-3 link-light text-decoration-none"
                    to="/login"
                  >
                    Login
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
