import Header from "./../../components/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "") {
      return alert("enter email");
    }
    if (password === "") {
      return alert("enter password");
    }
    if (password.length < 8) {
      return alert("password length must be < 8");
    }
    try {
      const res = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password,
      });
      if (res && res.data) {
        setUser({
          name: res.data.name,
          token: res.data.token,
          role: res.data.role,
        });
        alert("login correct");

        return console.log(user);
      }
    } catch (error) {
      console.log(error);
      alert("user not found");
      navigate("/register");
    }
  };

  useEffect(() => {
    console.log("lest", user);
    localStorage.setItem("auth", JSON.stringify(user));
  }, [user]);

  return (
    <div>
      <Header />

      <div
        className="d-flex align-items-center justify-content-center flex-column "
        style={{ marginTop: "80px" }}
      >
        <div
          className="card text-bg-dark mb-3"
          style={{ minHeight: "400px", width: "300px", padding: "20px" }}
        >
          <h1>LOGIN</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text text-bg-dark">
                Well never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
