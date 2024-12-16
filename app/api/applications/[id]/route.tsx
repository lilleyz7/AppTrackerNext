import { FullApplication } from "@/app/types/FullApplication";
import RefreshTokens from "@/app/utils/refreshToken";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const urlExtension = "/api/get_single_app/"

async function getTokens(){
    const access = (await cookies()).get("access")?.value
    const refresh = (await cookies()).get("refresh")?.value
    const tokens = [access, refresh]
    return tokens
}

async function getApplication(id: string, authToken: string): Promise<[FullApplication?,Error?]>{
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
        const data: FullApplication = await res.json()
        if (!res.ok){
            return [data, undefined]
        }
        console.log(data)
        return [data, undefined]
    } catch(error){
        return [undefined, new Error("" + error)]
    }
}
export async function GET(req: NextApiRequest, { params }: { params: Promise<{ id: string }>}){
    const tokens = await getTokens()
    const authToken = tokens[0]
    const refreshToken = tokens[1] 

    const id = (await params).id

    if (authToken){
        const application = await getApplication(id, authToken)
        if(application[0]){
            return NextResponse.json({"app": application[0]}, {status: 200})
        }
        return NextResponse.json({"error": application})
    }

    else if (refreshToken){
        const success = await RefreshTokens()
        if (success){
            const tokens = await getTokens()
            const authToken = tokens[0]

            const id = (await params).id
            if (authToken){
                const application = await getApplication(id, authToken)
                if(application[0]){
                    return NextResponse.json({"app": application[0]}, {status: 200})
                }
                return NextResponse.json({"error": application})
            }
        }
    }
}