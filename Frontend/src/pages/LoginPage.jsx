import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import jwtDecode from 'jwt-decode';
const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) return;

    try {
      const res = await axios.post(`http://localhost:3000/api/v1/login/`, {
        email,
        password,
      });
      console.log("login response", res.data)
console.log("login success")

localStorage.setItem("token", res.data.user.email);
localStorage.setItem("userId", res.data.user._id);
console.log("token", res.data.user)


      navigate("/"); // Redirect to task list page after updating
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">📝 Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-4 rounded-xl hover:from-green-600 hover:to-green-800 transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <span className="text-green-600 cursor-pointer hover:underline">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
