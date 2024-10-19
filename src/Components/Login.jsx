import React, { useState } from "react";
import { useAuth } from "../AuthContext"; // Use the authentication context

export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await login(email, password); 
      } else {
        await register(email, password); 
      }
    } catch (error) {
      setError(
        isLoginMode
          ? "Invalid email or password"
          : "Failed to create an account, Minimmum 6 digit password"
      );
    }
  };

  return (
    <div className="auth-page bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLoginMode ? "Login" : "Register"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-500 hover:underline"
          >
            {isLoginMode ? "Create one" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
