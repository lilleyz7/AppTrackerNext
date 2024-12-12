"use client"

import { FormEvent, useState } from "react";

export default function ResetPassword(){

    const [email, setEmail] = useState("");

    const resetPassword = async (e: FormEvent) => {
        e.preventDefault();

        const API_URL = 'http://127.0.0.1:8000/auth/users/reset_password/'

        const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        });

        if (res.ok) {
        console.log(res.body);
        }}

        return (
            <form onSubmit={resetPassword}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
        )
}