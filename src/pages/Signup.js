import React, { useState } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form);
      alert("Signup successful! Check your email 📧");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
      console.log(err.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Signup</h2>

      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-success w-100">Signup</button>
      </form>
    </div>
  );
}

export default Signup;