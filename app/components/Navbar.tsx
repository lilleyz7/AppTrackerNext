"use client"

import Link from "next/link"
import { redirect } from "next/navigation"

export default function Navbar(){

    async function logout(){
        const url = "/api/logout"
        const options = {
            method: "POST"
        }

        const res = await fetch(url, options)
        if (res.ok){
            redirect('/auth/login')
        } else{
            alert("failed to logout")
        }
    }
    return (
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link className="btn btn-ghost text-xl" href="/">My Applications</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a href="/about">About</a></li>
      <li><a href="/applications">Add Application</a></li>
      <li><button onClick={logout}>Logout</button></li>
    </ul>
  </div>
</div>
    )
}