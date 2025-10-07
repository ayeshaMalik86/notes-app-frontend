import React, { useState } from "react";
import API from "../api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try{
      const res = await API.post("/auth/signup", formData);
      console.log("Signup successful", res.data);
      alert("Signup successful");

      window.location.href = "/login";
    } catch (err) {
      console.log("Signup failed", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen bg-white text-[#1a1a1a]">

      <div className="w-1/2 min-h-screen hidden md:flex items-center justify-center">
        <img
          src="/assets/signup-img.png"
          alt="Notes App Theme"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        <h1 className="text-3xl font-bold mb-6 tracking-wide">Sign Up</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}


        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 rounded-md bg-transparent border border-gray-500  placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-transparent border border-gray-500 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 rounded-md bg-transparent border border-gray-500  placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-[#1a1a1a] text-white font-semibold rounded-md hover:scale-105 transition-all"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-[#1a1a1a] underline hover:text-gray-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
