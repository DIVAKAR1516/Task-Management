import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // 🔐 Store JWT
      localStorage.setItem("token", res.data.access);

      alert("Login successful 🚀");
      navigate("/dashboard");

    } catch (err) {
      alert("Invalid credentials");
      console.log(err.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-primary w-100">Login</button>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;