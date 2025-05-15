// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import axios from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForm.css";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data.token);
      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div className="auth-container">
        <img src={logo} alt="ExploreHub Logo" className="auth-logo" />
        <h2 className="auth-title">Login to ExploreHub</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="switch-link">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
