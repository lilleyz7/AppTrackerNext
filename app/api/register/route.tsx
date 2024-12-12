import { NextRequest, NextResponse } from "next/server";

interface RequestData {
    email: string,
    password: string,
    re_password: string
}

export async function POST(req: NextRequest){
    const requestData: RequestData = await req.json()
    const url = "http://127.0.0.1:8000/auth/users/"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    }
    console.log(JSON.stringify(requestData))

    try{
        const res = await fetch(url, options)
        const data = await res.json()
        if (res.ok){
            return NextResponse.json({"data": JSON.stringify(data)},{status: 200})
        } else{
            console.log(res)
            return NextResponse.json({"error": "failed to fetch"}, {status: res.status})
        }

    } catch (error){
        console.log(error)
        return NextResponse.json({"error": error})
    }

}