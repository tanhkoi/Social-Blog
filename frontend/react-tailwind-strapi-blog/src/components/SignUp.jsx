// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom"; // Import Link

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-blue-400">Sign Up</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-300" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              id="name"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              type="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button className="bg-blue-500 text-white hover:bg-white-600 p-2 rounded-lg w-full mb-2">
            Sign Up
          </button>
          <p className="text-sm text-gray-300 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


