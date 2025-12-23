import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // yaha normally API call hogi
    setUser({ email });

    // 🔀 redirect after login
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#020617] to-[#0f172a]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#020617] text-white p-6 rounded-2xl shadow-xl w-[340px] flex flex-col gap-4 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <p className="text-sm text-gray-400 text-center">
          Welcome back
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          className="bg-[#020617] border border-gray-700 px-4 py-3 rounded-xl outline-none focus:border-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#020617] border border-gray-700 px-4 py-3 rounded-xl outline-none focus:border-blue-500"
          required
        />

        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition py-3 rounded-xl font-semibold"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-400">
           Have not an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>  
      </form>
    </div>
  );
};

export default Login;
