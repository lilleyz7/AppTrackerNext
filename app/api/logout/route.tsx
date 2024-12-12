import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(){
    try{
    (await cookies()).delete("access")
    } catch (error){
        return NextResponse.json({"error": `access cookie do not exist: ${error}`})
    }

    try{
        (await cookies()).delete("refresh")
        } catch (error){
            return NextResponse.json({"error": `refresh cookie do not exist: ${error}`})
        }

    return NextResponse.json({status: 200})
}