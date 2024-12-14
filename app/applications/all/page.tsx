"use client"

import { useEffect, useState } from "react"
import { FullApplication } from "../../types/FullApplication"

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
    <div>
      <h1>Applications</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((app) => (
            <li key={app.id}>{app.company}</li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}