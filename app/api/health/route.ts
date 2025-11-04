import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sql } from "drizzle-orm"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Test database connection
    await db.execute(sql`SELECT 1`)

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "0.1.0",
      database: "connected",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Database connection failed",
      },
      { status: 500 }
    )
  }
}
