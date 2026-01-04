import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import api from "../api/axios.js";
import "./CSS/Login.css"

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
    <div className="login-container">
      <form className="login-form">
        <h2 className="">Login</h2>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=""
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
          required
        />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="login-btn"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="login-footer">
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
