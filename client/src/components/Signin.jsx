import React, { useContext, useState } from 'react';
import axios from 'axios';
import { SigninContext } from './SigninContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signin() {
  const { handleSignIn } = useContext(SigninContext); // Access handleSignIn from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSignInRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        email,
        pass: password,
      });
       
      // Assuming the server response contains user data like name
      handleSignIn(response.data.email); // Save to context and sessionStorage
      toast.success("Sign In Successful");
      if(email==='admin@gmail.com')
      {
        nav("/admin")
      }
      else
      {

        nav("/"); // Redirect to home page after successful sign-in
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage); // Show error toast
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Sign In</h2>
        <form onSubmit={handleSignInRequest}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full p-3 text-white bg-black hover:opacity-80 rounded-md transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/signup" // Link to the signup page
              className="text-blue-600 hover:text-blue-700"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
