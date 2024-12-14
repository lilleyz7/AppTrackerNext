import { FullApplication } from "@/app/types/FullApplication";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const urlExtension = "/api/get_apps";

export async function GET() {
  const authToken = (await cookies()).get("access")?.value;

  if (!authToken) {
    return NextResponse.json({ error: "JWT does not exist" }, { status: 400 });
  }

  const url = `http://127.0.0.1:8000${urlExtension}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorResponse = await res.json();
      return NextResponse.json(
        { error: errorResponse.error || "Failed to fetch applications" },
        { status: res.status }
      );
    }

    const data: FullApplication[] = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}