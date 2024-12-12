'use client'

import {  FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter()

  const goToLogin = () => {
    router.push('./login')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = "/api/register/"

    if (password !== confirmPassword) {
        alert("Passwords do not match");
    }

    else{
      const formData = {
        username: username,
        email: email,
        password: password,
        re_password: confirmPassword,
      }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log(res)
    if (res.ok){
      router.push('./login')
    } else{
      const data = await res.json()
      console.log(data)
      alert(data.detail)
    }
}
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card bg-base-100 shadow-xl w-96">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
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
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="input input-bordered"
                value={username}
                minLength={7}
                maxLength={15}
                required
                onChange={(e) => setUsername(e.target.value)}
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
                minLength={8}
                maxLength={20}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={confirmPassword}
                minLength={8}
                maxLength={20}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <button
                onClick={goToLogin}
                className="btn btn-link text-primary"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}