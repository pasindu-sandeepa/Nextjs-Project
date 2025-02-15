"use client";
import { useState } from "react";

//Client component  for CSR
export default function login_form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data : ", { email, password });
  };

  return (
    <div className="w-[400px] mx-auto  ">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-center text-xl font-bold text-blue-500">
            Sign in to Your Account
          </h3>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border-gray-500 ring-1 ring-offset-1  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              placeholder="yourname@gmail.com"
            />
          </div>

          <div>
            <label
              htmlFor="Password"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border-gray-500 ring-1 ring-offset-1  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              placeholder="***********"
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-300 h-4 w-4 rounded-md"
              />
            </div>

            <div className="text-sm ml-3">
              <label htmlFor="remember" className="font-medium text-gray-900 ">
                Remember me{" "}
              </label>
            </div>
            <div className="text-sm ml-auto">
              <a
                href="/ForgetPassword"
                className=" text-blue-700 font-semibold"
              >
                {" "}
                Forget Password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-green-500 focus:ring-2 font-medium focus:ring-blue-300 text-white w-full p-2.5 rounded-lg"
            >
              Sign in
            </button>
          </div>
          <div className="flex justify-center text-gray-500 space-x-1">
            <span>Not registered yet?</span>
            <a href="/register" className="text-blue-700 hover:underline">
              Create an account
            </a>
            <div></div>
          </div>
        </form>
      </div>
    </div>
  );
}
