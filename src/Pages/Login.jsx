import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/image.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">

        
        <div className="text-center mb-4">
          <img src={logo} alt="HiddenInk Logo" className="w-25 mx-auto mb-1" />
          <h2 className="text-xl font-semibold text-gray-700">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login to continue</p>
        </div>

        
        <form className="space-y-3">
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

          
          <div className="flex items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
          </div>

          
          <button className="w-full bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>

          
          <Link
            to="/forgot-password"
            className="block text-center text-sm text-blue-600 hover:underline"
          >
            Forgot your password?
          </Link>
        </form>

        
        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-xs text-gray-500">or</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-2.5 rounded-lg hover:bg-gray-100 transition">
            <FcGoogle size={18} />
            Sign in with Google
          </button>
        </div>

        
        <p className="text-center mt-3 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
