import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "sonner";

const Signup = () => {
  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);
  useEffect(() => {
    if (authUser?.isLogin) {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignup({
      name: "",
      email: "",
      password: "",
    });

    try {
      const response = await api.post("/signup", signup);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>

          <p className="text-gray-400 mt-2">
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>

            <input
              value={signup.name}
              onChange={handleSignup}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>

            <input
              value={signup.email}
              onChange={handleSignup}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>

            <input
              value={signup.password}
              onChange={handleSignup}
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
