import { useContext, useState } from "react";
import { ProductsContext } from "../../App";
import Header from "../../components/Header";
import axios from "axios";

const AdminPage = () => {
  const { products, setProducts } = useContext(ProductsContext);

  const [newItem, setNewItem] = useState({
    title: "",
    desc: "",
    prix: "",
    img: "",
    count: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addItem(newItem);
    setNewItem({ title: "", desc: "", prix: "", img: "", count: 0 });
  };

  const addItem = (newItem) => {
    axios
      .post("http://localhost:4000/api/product/add", newItem)
      .then((response) => {
        const newProducts = [...products, response.data];
        setProducts(newProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteItem = (id) => {
    axios
      .delete("http://localhost:4000/api/product/" + id)
      .then(() => {
        // Remove the deleted item from the products context
        const filteredProducts = products.filter((item) => item._id !== id);
        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Header />
      <div
        className="d-flex align-items-center justify-content-center flex-column "
        style={{ marginTop: "80px" }}
      >
        <div
          className="card text-bg-dark mb-3"
          style={{ minHeight: "400px", minWidth: "500px", padding: "20px" }}
        >
          <table className="table text-bg-dark mb-3">
            <thead>
              <tr>
                <th scope="col">image</th>
                <th scope="col">Product Name</th>
                <th scope="col">prix</th>
                <th scope="col">cotities</th>

                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      style={{ height: "80px", width: "80px" }}
                      src={item.img}
                      alt=""
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.prix}</td>
                  <td
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "96.6px" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: "30px", width: "30px" }}
                    >
                      {item.count}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => deleteItem(item._id)}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h1>add product</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Product Name"
                value={newItem.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="desc"
                placeholder="Product Description"
                value={newItem.desc}
                onChange={handleChange}
              />
              <input
                type="number"
                name="prix"
                placeholder="Product Price"
                value={newItem.prix}
                onChange={handleChange}
              />
              <input
                type="number"
                name="count"
                placeholder="count"
                value={newItem.count}
                onChange={handleChange}
              />
              <input
                type="text"
                name="img"
                placeholder="Product Image URL"
                value={newItem.img}
                onChange={handleChange}
              />
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
