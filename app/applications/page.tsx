"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Application } from "../types/Application";

export default function Add_application(){
    const router = useRouter()

    const defaultData: Application = {
        title: "",
        company: "",
        details: "",
        location: "",
        listing: "",
        status: ""
    }
    const [formData, setFormData] = useState<Application>(defaultData);

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.currentTarget;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };


    async function handleSubmit(e: FormEvent){
      e.preventDefault()
        const url = "/api/applications/add_app"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)
        }

        const res = await fetch(url, options)
        if (res.ok){
            alert("Application Added Successfully")
            router.push('/')
        } else{
            const data = await res.json()
            console.log(data)
            alert(`Failed to add with error: ${data.error}`)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
          >
            <h1 className="text-2xl font-bold mb-6 text-center">New Application</h1>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className="input input-bordered w-full"
                required
              />
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter position"
                className="input input-bordered w-full"
                required
              />
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Details
              </label>
              <textarea
                rows={20}
                cols={50}
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Listing
              </label>
              <input
                type="text"
                name="listing"
                value={formData.listing}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter valid url to listing"
                required
              />
            </div>

    
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <input
              type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="textarea textarea-bordered"
                required
              >
              </input>
            </div>
    
            <div className="flex items-center justify-between">
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </div>
          </form>
        </div>)
}