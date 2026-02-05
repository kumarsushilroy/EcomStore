import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../redux/Api";
import Loader from "../common/Loader";
import {
  useAllProductsQuery,
  useSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} from "../../redux/authApi.js";
import { useState } from "react";
import Modal from "./Modal.jsx";

const ProductList = ({isLoading:updateLoading, deleteLoading }) => {
  const navigate = useNavigate();

  const [searchVal, setSearchVal] = useState("");
  const [categoryVal, setCategoryVal] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");

  const [prodId, setProdId] = useState("");
  const { data: prod } = useAllProductsQuery({ searchVal, categoryVal });
  const { data: sigleProd } = useSingleProductQuery(prodId,{skip:!prodId});
  const [updateProduct, {data:updatedProd, isLoading}] = useUpdateProductMutation();
  const[deleteProduct, {data:deletedData}] = useDeleteProductMutation()

   console.log('updatedProd==', updatedProd)

  const getProductInfo = (id) => {
    setProdId(id);
  };
 console.log('prodIddd=', prodId)

  const handleSubmit = async()=>{
    const formData = new FormData();
    formData.append('name', name)
    formData.append('price', price)
    formData.append('category', category);
    formData.append('photo',photo);
    await updateProduct({prodId,updatedInfo:formData})

    setName('');
    setPrice(''),
    setCategory(''),
    setPhoto('')
  }

  useEffect(() => {
    if (sigleProd?.singleProd) {
      setName(sigleProd?.singleProd.name);
      setPrice(sigleProd?.singleProd.price);
      setCategory(sigleProd?.singleProd.category);
      setPhoto(sigleProd?.singleProd.photo)
    }
  }, [sigleProd]);

  const [addProduct, {data:createdProdData, isLoading:addProdLoading}] = useAddProductMutation()
  console.log('createdprod==', createdProdData)
  const createProduct = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',name);
    formData.append('price', price);
    formData.append('category',category);
    formData.append('photo',photo);

    await addProduct(formData)
  }

  return (
    <div >
       <button data-bs-target="#addProdModal" data-bs-toggle="modal" className="bg-green-500 text-white font-bold px-5 rounded p-2 mt-4 hover:bg-green-600 duration-100 m-1">+ Add</button>
      <table className="table p-5 overflow-y-scroll">
       
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prod?.product?.map((item, i) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <img
                  style={{ width: "50px", height: "50px" }}
                  className=" rounded-circle"
                  src={item.photo}
                  alt=""
                />
              </td>
              <td className="d-flex gap-2">
                <button
                  onClick={() => getProductInfo(item._id)}
                  className="btn btn-success btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editProductModal"
                >
                  Edit
                </button>
               
                <button
                  disabled={deleteLoading}
                  onClick={() => deleteProduct(item._id)}
                  className="btn btn-danger btn-sm"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        id="editProductModal"
        title="Edit Product"
        saveText="Update"
        onSave={handleSubmit}
        loader={''}
      >
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="">Price</label>
        <input
          type="text"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="" className="m-2">
          Category
        </label>
        <select value={category} id="" onChange={(e) => setCategory(e.target.value)}>
          <option value="">select category</option>
          <option value="furniture">furniture</option>
          <option value="electronic">electronics</option>
        </select>

        <input
          type="file"
          className="form-control"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        </form>
      </Modal>

      <Modal
        id="addProdModal"
        title="Add Product"
        saveText="Add"
        onSave={createProduct}
        loader={addProdLoading}
      >
        <form onSubmit={createProduct}>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="">Price</label>
        <input
          type="text"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="" className="m-2">
          Category
        </label>
        <select value={category} id="" onChange={(e) => setCategory(e.target.value)}>
          <option value="">select category</option>
          <option value="furniture">furniture</option>
          <option value="electronic">electronics</option>
        </select>

        <input
          type="file"
          className="form-control"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        </form>
      </Modal>
    </div>
  );
};

export default ProductList;
