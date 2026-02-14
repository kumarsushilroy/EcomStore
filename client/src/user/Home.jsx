import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProdCard from "./ProdCard";
import { useAllProductsQuery } from "../../redux/authApi";
import { categoryList } from "../../Constant.js";

const Home = () => {
  const [searchVal, setSearchVal] = useState("");
  const [categoryVal, setCategoryVal] = useState("");
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useAllProductsQuery({ searchVal, categoryVal });

  //  const categories = [...new Set(copiedCategory?.map(item=>item.category))]

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <header className="bg-gray-800 text-white py-8">
        <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
        <p className="text-lg mt-2">Discover our amazing products!</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="w-full  border-gray-300 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
          <input
            onChange={(e) => setSearchVal(e.target.value)}
            className="m-2 p-2 bg-gray-50 rounded-xl shadow outline-none w-full md:w-1/2"
            placeholder="search products ...."
            type="text"
          />
          <select
            className="outline-none border border-gray-200 shadow p-2 rounded"
            name=""
            id=""
            onChange={(e) => setCategoryVal(e.target.value)}
          >
            <option value="">All category</option>
            {categoryList.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.product?.map((item) => (
            <ProdCard prod={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
