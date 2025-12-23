import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate("/")
        
    }
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#020617] to-[#0f172a]">
      <form 
      onSubmit={handleSubmit}
      className="bg-[#020617] text-white p-6 rounded-2xl shadow-xl w-[340px] flex flex-col gap-4 border border-gray-800">
        
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <p className="text-sm text-gray-400 text-center">
          Join us and start your journey
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="bg-[#020617] border border-gray-700 px-4 py-3 rounded-xl outline-none focus:border-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-[#020617] border border-gray-700 px-4 py-3 rounded-xl outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-[#020617] border border-gray-700 px-4 py-3 rounded-xl outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition py-3 rounded-xl font-semibold cursor-pointer"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
