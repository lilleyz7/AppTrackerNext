"use client"

import { useRouter } from "next/navigation";
import {  FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const router = useRouter();
  
  const goToRegister = () => {
    router.push('./register');
    return;
  }
  
  const forgotPassword =  () => {
    
    router.push('./forgot-password');
    return;
  }
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = "/api/login/"
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/')
      return;
    } else{
      alert("Invalid credentials. Please try again.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card bg-base-100 shadow-xl w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p>
              Not yet registered?{" "}
              <button
                onClick={goToRegister}
                className="btn btn-link text-primary"
              >
                Register here
              </button>
            </p>
            <p>
              Forgot Password?{" "}
              <button
                onClick={forgotPassword}
                className="btn btn-link text-primary"
              >
                Click Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}