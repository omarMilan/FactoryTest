import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../assets/logo.png";

const Credentials = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false); // 🔥 loader control

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    const data = isSignUp ? { username, email, password } : { email, password };

    try {
      const res = await axios.post(url, data);

      if (!isSignUp) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username || "User");

        setShowLoader(true); // 🟡 Show loading screen
        setTimeout(() => {
          navigate("/Home");
        }, 2000); // ⏱ Wait 2s before navigating
      } else {
        alert("Account created. You can now log in.");
        setIsSignUp(false);
      }
    } catch (err) {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="loader"
            className="fixed inset-0 bg-Primary z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-4xl font-bold"
            >
              <img src={logo} />
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login / Signup form */}
      {!showLoader && (
        <form
          onSubmit={handleSubmit}
          className="max-w-sm p-6 bg-white rounded shadow"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>

          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-300"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:underline"
            >
              {isSignUp ? "Log in here" : "Sign up here"}
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Credentials;
