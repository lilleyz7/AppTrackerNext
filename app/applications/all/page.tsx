"use client"

import { useEffect, useState } from "react"
import { FullApplication } from "../../types/FullApplication"
import Link from "next/link";

const defaultData: FullApplication[] = [];

export default function ApplicationsPage() {
  const [data, setData] = useState<FullApplication[]>(defaultData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      const url = "/api/applications/all_apps";

      try {
        const res = await fetch(url);

        if (!res.ok) {
          const errorResponse = await res.json();
          setError(errorResponse.error || "Failed to fetch applications");
          return;
        }

        const fetchedData: FullApplication[] = await res.json();
        setData(fetchedData);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("An unexpected error occurred");
      }
    }

    getData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold my-6">Your Saved Applications</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((app) => (
          <div key={app.id} className="card shadow-xl bg-base-200">
            <div className="card-body">
              <h2 className="card-title">
                <Link className="hover:underline" href={`/applications/${app.id}` }>
                  {app.company}
                </Link>
              </h2>
              <p className="text-lg">
                <Link href={`/applications/${app.id}`} className="text-primary hover:underline">
                  {app.title}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}