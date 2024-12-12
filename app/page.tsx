import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Navbar from "./components/Navbar"

export default async function Home(){
        const user = (await cookies()).get("access")
        if (!user) {
                redirect('/auth/login/')
        }
        return(
                
                <div className="bg-gray-100">
        <Navbar />

        <h1>Home</h1>
                </div>
        
)
}