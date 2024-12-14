import { ApplicationDTO } from "@/app/types/ApplicationDTO";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const urlExtension = "/api/add_app"

export async function POST(req: NextRequest){
    const authToken = (await cookies()).get("access")?.value
    console.log(authToken)
    if(!authToken){
        return NextResponse.json({"error": "no logged in authToken"}, {status: 400})
    }

    const body: ApplicationDTO | undefined = await req.json()
    console.log(body)
    if (!body){
        return NextResponse.json({"error": "incorrect data given"}, {status: 400})
    }

    const url = "http://127.0.0.1:8000" + urlExtension
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(body)
    }

    console.log(options.body)

    try{
    const res = await fetch(url, options)
    const data = await res.json()
    console.log(data)
    if (res.ok){
        return NextResponse.json({"Data": data.id},{status: 200})
    } else{
        return NextResponse.json({"error": data.error}, {status: 400})
    }
    } catch (e){
        return NextResponse.json({"error": e}, {status: 400})
    }
}