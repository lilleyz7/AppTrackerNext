import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const urlExtension = "/api/get_single_app/"

export async function GET(req: NextApiRequest, { params }: { params: Promise<{ id: string }>}){
    const authToken = (await cookies()).get("access")?.value
        console.log(authToken)
        if(!authToken){
            return NextResponse.json({"error": "no logged in authToken"}, {status: 400})
        }
    const id = (await params).id
    console.log(id)

    const url = "http://127.0.0.1:8000" + urlExtension + id
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        }
    }

    try{
        const res = await fetch(url, options)
        const data = await res.json()
        if (!res.ok){
            return NextResponse.json({"error": data}, {status: res.status})
        }
        console.log(data)
        return NextResponse.json({"app": data}, {status: 200})
    } catch(error){
        return NextResponse.json({"error": error}, {status: 400})
    }
}