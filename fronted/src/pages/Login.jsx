import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import api from "../api/axios.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      const loggedInUser = response.data.data.user;

      // Save user in context and localStorage
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      navigate("/profile");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Login failed, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#020617] to-[#0f172a]">
      <form className="bg-[#020617] text-white p-6 rounded-2xl shadow-xl w-[340px] flex flex-col gap-4 border border-gray-800">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

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
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition py-3 rounded-xl font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-400 mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
