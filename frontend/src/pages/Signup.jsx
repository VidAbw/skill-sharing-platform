// src/pages/SignupPage.jsx
import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForm.css";
import logo from "../assets/logo.png";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/auth/signup", form);
      navigate("/login");
    } catch {
      setError("Signup failed. Email may already be used.");
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
        <h2 className="auth-title">Create an ExploreHub Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="fullName"
            onChange={handleChange}
            value={form.fullName}
            placeholder="Full Name"
            required
          />
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
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
