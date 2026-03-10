import React, { useEffect, useState } from "react";
import { useUserLoginMutation } from "../../redux/authApi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userLogin, { data, isLoading, error, isSuccess }] = useUserLoginMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Login successful");
    }
  }, [isSuccess, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userLogin({ email, password }).unwrap();

      localStorage.setItem("user", JSON.stringify(res.user));

      if (res.user?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-md-3 shadow-lg mx-auto rounded">

        <form onSubmit={handleSubmit} className="p-5">

          <button onClick={() => navigate("/")} className="bg-blue-50 px-4 rounded">
            back
          </button>

          <h3 className="text-center text-success">Login</h3>

          <p className="font-bold m-0">admin credential</p>
          <p className="m-0">email: admin@gmail.com</p>
          <p className="m-0">password: admin123</p>

          <h1 className="my-3"></h1>

          <p className="font-bold m-0">user credential</p>
          <p className="m-0">email: suryas@gmail.com</p>
          <p className="m-0">password: surya123</p>

          <div className="mb-3 mt-4">
            <label className="form-label">Email</label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>

          <div className="flex items-center gap-3">
            <button disabled={isLoading} type="submit" className="btn btn-success">
              {isLoading ? "Logging..." : "Login"}
            </button>

            <Link to="/register">Register</Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;