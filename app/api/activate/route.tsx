import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {uid, token} = await request.json()
    const url = `http://127.0.0.1:8000/auth/users/activation/${uid}/${token}`

    try{
        const options = {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            }
        }

        const res = await fetch(url, options)
        if (res.ok){
            return NextResponse.json({"data": res.json()}, {status: 200})
        } else{
            return NextResponse.json({"error": res.json()}, {status: res.status})
        }
    } catch (error){
        console.log(error)
        return NextResponse.json({"error": JSON.stringify(error)}, {status: 400})
    }

}