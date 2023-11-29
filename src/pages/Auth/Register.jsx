import axios from "axios";
import { UserContext } from "../../App";
import Header from "./../../components/Header";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === "") {
      return alert("enter name");
    }
    if (email === "") {
      return alert("enter email");
    }
    if (password === "") {
      return alert("enter password");
    }
    if (password.length < 8) {
      return alert("password length must be < 8");
    }
    if (checkPassword.length < 8) {
      return alert("checkPassword length must be < 8");
    }
    if (password !== checkPassword) {
      return alert("password not match");
    }
    const NewUser = {
      name,
      email,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/add",
        NewUser
      );
      if (res && res.data) {
        alert("register is correct");
      }
    } catch (error) {
      console.log(error);
    }

    return navigate("/login");

    // alert(
    //   `The name you entered was: ${name} ///
    //   The email you entered was: ${email}///
    //   and The password you entered was: ${password}`
    // );
  };
  useEffect(() => {
    console.log(user);
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
          style={{ minHeight: "400px", width: "350px", padding: "20px" }}
        >
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="NameHelp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check"></div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
