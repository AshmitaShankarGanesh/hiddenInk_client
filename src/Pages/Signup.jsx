import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/image.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

        
        <div className="text-center mb-4">
          <img src={logo} alt="HiddenInk Logo" className="w-25 mx-auto mb-1" />
          <h2 className="text-xl font-semibold text-gray-700">Create Account</h2>
          <p className="text-gray-500 text-sm">Join HiddenInk today</p>
        </div>

        
        <form className="space-y-3">
          <input 
            type="text" 
            placeholder="Full Name"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input 
            type="email" 
            placeholder="Email"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input 
            type="password" 
            placeholder="Password"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        
        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-xs text-gray-500">or</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-2.5 rounded-lg hover:bg-gray-100 transition">
            <FcGoogle size={18} />
            Sign up with Google
          </button>

          
        </div>

        
        <p className="text-center mt-3 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
