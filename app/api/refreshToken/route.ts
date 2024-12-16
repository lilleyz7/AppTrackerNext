import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const urlExtension = "/auth/jwt/refresh"

export default async function POST(){
    const refreshToken = (await cookies()).get("refresh")
    if (refreshToken){
        return NextResponse.json("Token invalid", {status: 400})
    }

    const url = "http://127.0.0.1:8000" + urlExtension
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(refreshToken),
    
    }

    try{
        const res = await fetch(url, options)
        const data  = await res.json()
        if (!res.ok){
            return NextResponse.json({"error": data}, {status: 404})
        }
        (await cookies()).set("access", data.access, {httpOnly: true, maxAge: 9000})
        return NextResponse.json({status: 200})
    } catch(error){
        return NextResponse.json({"error": error}, {status: 400})
    }
}