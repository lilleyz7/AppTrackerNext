import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RequestData {
    email: string,
    password: string
}

interface Response {
    access: string,
    refresh: string
}

export async function POST(req: NextRequest){
    const requestData: RequestData = await req.json()
    const url = "http://127.0.0.1:8000/auth/jwt/create"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    }

    try{
        const res = await fetch(url, options)
        const data: Response = await res.json()
        if (res.ok){
            (await cookies()).set("access", data.access, {httpOnly: true, maxAge: 9000})
            ;(await cookies()).set("refresh", data.refresh, {httpOnly: true, maxAge: 124000})
            return NextResponse.json({status: 200})
        } else{
            console.log("failed to fetch")
            return NextResponse.json({"error": "failed to fetch"}, {status: res.status})
        }

    } catch (error){
        console.log(error)
        return NextResponse.json({"error": error})
    }

}