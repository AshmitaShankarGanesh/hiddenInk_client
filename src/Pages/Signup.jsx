import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/image.png";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://hiddenink-server-1jes.onrender.com/api/auth/signup", form);
      navigate("/login"); // ✅ redirect after signup
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

        <div className="text-center mb-4">
          <img src={logo} alt="HiddenInk Logo" className="w-24 mx-auto mb-1" />
          <h2 className="text-xl font-semibold text-gray-700">Create Account</h2>
          <p className="text-gray-500 text-sm">Join HiddenInk today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2.5 rounded-lg border"
            required
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2.5 rounded-lg border"
            required
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2.5 rounded-lg border"
            required
          />

          <button className="w-full bg-blue-600 text-white p-2.5 rounded-lg">
            Sign Up
          </button>

        </form>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
