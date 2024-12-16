const url = "/api/refreshToken"

export default async function RefreshTokens(): Promise<boolean>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }

    try{
        const res = await fetch(url, options)
        const data = await res.json()
        console.log(data)
        if (res.ok){
            return true
        } else{
            return false
        }
    } catch (error){
        console.log(error)
        return false
    }
}