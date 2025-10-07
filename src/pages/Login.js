import React, {useState} from "react";
import API from "../api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            const {data} = await API.post("/auth/login", {email, password});
    
            localStorage.setItem("token", data.token);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
    
            window.location.href = "/";
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
        }
    };
  return (
    <div className="flex h-screen bg-white text-[#1a1a1a]">
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/assets/login-img.png"
          alt="Notes App Theme"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        
        <h1 className="text-3xl font-bold mb-6 tracking-wide">Login</h1>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-transparent border border-gray-500  placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-transparent border border-gray-500  placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#1a1a1a] text-white font-semibold rounded-md hover:scale-105 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#1a1a1a] underline hover:text-gray-300">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
