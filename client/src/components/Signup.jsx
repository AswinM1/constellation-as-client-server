import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const nav=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        name: username,
        email,
        pass: password,
      });
      alert("Sign Up Successful");
      nav("/signin")
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("please complete your information" || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-20 mb-20">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Sign Up</h2>
        
        <form onSubmit={handleSubmit} method='POST' >
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            
            />
          </div>
          
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full p-3 text-white bg-black hover:bg-opacity-80 rounded-md transition duration-300"
          onClick={handleSubmit} >
            Sign Up
          </button>
        </form>
        
        {/* Sign In Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
