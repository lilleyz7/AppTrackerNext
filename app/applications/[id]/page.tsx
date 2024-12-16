"use client"

import { FullApplication } from "@/app/types/FullApplication";
import { redirect, useParams} from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplicationDetails(){
    const { id } = useParams(); // Get dynamic route parameter
    const [app, setApp] = useState<FullApplication | undefined>(undefined);

    useEffect(() => {
        async function getData(){
            
            const url = `/api/applications/${id}`
            const options = {
                method: "GET",
                "Content-Type": "application/json"
            }

            try{
                const res = await fetch(url, options)
                const data = await res.json()
                if (res.ok){

                  setApp(data.app)
                } else{
                  return redirect('/auth/login')
                }
            } catch(e){
                alert(e)
            }
        }
        getData()
    }, [id])


    async function deleteApp(){
        const url = `/api/applications/delete/${id}`
        const options = {
            method: "DELETE",
            "Content-Type": "application/json",
        }
        try{
            const res = await fetch(url, options)
            if(!res.ok){
                alert("Unable to delete this application")
            } else{
                alert("Successfully deleted application")
                redirect("/all")
            }
        } catch (error){
            alert(error)
        }

    }

    if (!app) {
        return <div>Loading...</div>; // Loading state
      }

    return(
    <div className="min-h-screen bg-base-100 flex flex-col items-center">
    <div className="card w-full max-w-2xl shadow-xl bg-base-200 my-8">
      <div className="card-body">
        <h1 className="card-title text-3xl font-bold">{app.title}</h1>
        <p className="text-xl text-secondary">{app.company}</p>
        <div className="mt-4">
          <p><span className="font-bold">Status:</span> {app.status}</p>
          <p><span className="font-bold">Description:</span> {app.details}</p>
          <p><span className="font-bold">Location:</span> {app.location}</p>
          <p>
            <span className="font-bold">Job Listing:</span>{' '}
            <a
              href={app.listing}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {app.listing}
            </a>
          </p>
          <p><span className="font-bold">Date Added:</span> {app.added}</p>
        </div>
        <div className="mt-6">
            <button 
              className="btn btn-error w-full"
              onClick={deleteApp}
            >
              Delete Application
            </button>
          </div>
      </div>

    </div>
  </div>
);
}