// app/api/users/route.ts
import { NextResponse } from "next/server";
import db from "../../../database/pool";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM users");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching data: ", error);
    return NextResponse.json(
      {
        error: "internal server error",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
