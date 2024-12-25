import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginuser } from "../redux_toolkit/auth_slice";

function LoginPage() {


    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    const {error}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dispatching loginuser");
        const result = await dispatch(loginuser({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            console.log("Login successful");
            navigate('/');
            window.location.reload()
        } else {
            console.log("Login failed");
        }
    }




  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
         
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e)=>setemail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e)=>setpassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {error && (
          <span className="text-red-500 text-center block mt-4">
            {error.error}
          </span>
        )}



        </form>

      
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/registation" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
