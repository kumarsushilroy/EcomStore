import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import ProductList from "../common/ProductList";
import {toast} from 'react-hot-toast'
import { 
  useGetProductDataQuery,
  useGetProductDetailQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
        } from "../../redux/Api";
  


const Products = () => {

  const [product, setProduct] = useState([]);
  const [editForm, setEditform] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [productId, setproductId] = useState("");
  const [loader , setloader] = useState(false);

  const {data, isLoading, isError, error} = useGetProductDataQuery();
  
  const {data:productDetail} = useGetProductDetailQuery(productId,{skip:!productId});

  const [addproduct,{isLoading:addprodLoading}] = useAddProductMutation();
  const [updateProd,{isLoading:updateLoading}] = useUpdateProductMutation();
  const [deleteproduct,{isLoading:deleteLoading}] = useDeleteProductMutation();
  console.log('productdetail data==', productDetail)

  useEffect(()=>{
    if(productDetail){
      setName(productDetail.singleProd.name);
      setPrice(productDetail.singleProd.price);
      setCategory(productDetail.singleProd.category);
      setPhoto(productDetail.singleProd.photo)
    }
  },[productDetail])

 // addProduct
  // const addProduct = async ()=>{
  //   const formData = new FormData();
  //    formData.append('name', name);
  //    formData.append('price', price);
  //    formData.append('category', category);
  //    formData.append('photo', photo);
 
  //    console.log('mesasage==', addedData, addingSuccess)
  //    try {
  //     addprodLoading
  //      await addproduct(formData)
  //     if(addingSuccess){
  //       toast.success(addedData.message)
  //       addprodLoading
  //     }else{
  //       toast.error(addedData.message)
  //     }
  //   setName('');
  //   setPrice('');
  //   setCategory('');
  //   setPhoto('')
  //    } catch (error) {
  //      toast.error(error.message)
  //    }
   
    
  // }
const addProduct = async () => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("photo", photo);

  try {
    const res = await addproduct(formData).unwrap();
    console.log('RES==', res)
    if(res.success){
      toast.success(res.message || "Product added successfully");
    }

    setName("");
    setPrice("");
    setCategory("");
    setPhoto("");
  } catch (err) {
    toast.error(err?.data?.message || "Failed to add product");
  }
};


  //get singleProduct
  const singleProduct = async (prodId) => {
    setEditform(true);
    setproductId(prodId)
    const sigleProd = await axios.get(
      `https://ecomstore-0oqz.onrender.com/single-product/${productId}`
    );
    console.log("singleProddd", sigleProd);
    setName(productDetail?.singleProd?.name);
    setPrice(productDetail?.singleProd?.price);
    setCategory(productDetail?.singleProd?.category);
    setPhoto(productDetail?.singleProd?.photo);
    setproductId(productDetail?.data.singleProd._id);

  };
  
// update Product
  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("photo", photo);
    console.log('fomobject==', {name,price,category,photo,})  

    
    try {
       const res = await updateProd({id:productId,body:formData}).unwrap()
       if(res.success){
          toast.success(res.message)
       }
    
    setEditform(false);
    } catch (error) {
      toast.error(error.data.message)
    }
  
    
  };

  // delete Product
  const deleteProduct = async (productId) => {
    // const resp = await axios.delete(
    //   `http://localhost:4000/api/v1/delete-product/${productId}`
    // );
    // console.log("resp==", resp);
    // getProducts();
  
    try{
     const res = await deleteproduct(productId).unwrap()
     if(res.success){
      toast.success(res.message)
     }
    }catch(error){
     toast.error(error.data.message)
    }
  };
  
  return (

    <div className="container">
      <div className="row">
        
        <div className="col-md-12 mx-auto mt-5">
          {!editForm && (
            <span>
              <button
                disabled={addprodLoading}
                data-bs-toggle="modal" 
                data-bs-target="#editModal"
                className="btn btn-success p-2 btn-sm fw-bold"
              >
              {addprodLoading?'Adding':'Add Product'}  
              </button>
            </span>
          )}

          {!editForm ? (
            <ProductList singleProduct={singleProduct} isLoading={isLoading} deleteProduct={deleteProduct} deleteLoading={deleteLoading} />
          ) : (
            <form onSubmit={updateProduct} className="p-4 shadow">
              <div>
                <span>
                  <button
                    onClick={() => setEditform(false)}
                    className="btn btn-sm btn-primary"
                  >
                    ←Back
                  </button>
                </span>
              </div>
              <h4 className="text-center">Update Product</h4>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Product
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Price
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                  name=""
                  id=""
                >
                  <option value={category}>Electronics</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    className="rounded-circle"
                    src={photo}
                    alt=""
                  />
                </label>
                <input
                  className="form-control"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  type="file"
                />

            
              </div>

              <button disabled={updateLoading} type="submit" class="btn btn-success">
               {updateLoading?'Changing...':'Save Changes'} 
              </button>
            </form>
          )}
        </div>

        <Modal
          id="editModal"
          title="Edit Product"
          saveText="Add"
          onSave={addProduct}
          loader = {loader}
        >
          {/* Modal Body Content Comes Here */}
           <label htmlFor="">Product Name</label>
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

          <label htmlFor="" className="m-2">Category</label>
          <select name="" id="" onChange={(e)=>setCategory(e.target.value)}>
            <option value="">select category</option>
            <option value="furniture">furniture</option>
            <option value="electronic">electronics</option>
          </select>

          
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Products;
