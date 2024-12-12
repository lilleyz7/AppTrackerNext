"use client"

import { useParams } from 'next/navigation'
export default function Activate(){
  const params = useParams<{uid: string, token: string}>();
  const API_ENDPOINT = 'http://127.0.0.1:8000/auth/users/activation/'

  const options = {
    method: "POST",
    headers : {
          "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }

  const activateAccount = async () => {
    const response = await fetch(API_ENDPOINT, options);
    if (response.ok) {
      alert("Account activated successfully!");
    } else {
      alert("Failed to activate account. Please try again.");
    }
  }

  return (
    <div>
      <button onClick={activateAccount}>Activate Account</button>
    </div>
  )
}