import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const varName = searchParams.get("var")

  if (!varName) {
    return NextResponse.json({ error: "Missing var parameter" }, { status: 400 })
  }

  // Check if environment variable exists and is not empty
  const exists = !!process.env[varName] && process.env[varName] !== ""

  return NextResponse.json({ exists })
}
