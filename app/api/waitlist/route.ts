import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { waitlist } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = waitlistSchema.parse(body)

    // Check if email already exists
    const existing = await db.query.waitlist.findFirst({
      where: eq(waitlist.email, email),
    })

    if (existing) {
      return NextResponse.json(
        { error: "Email already on waitlist" },
        { status: 400 }
      )
    }

    // Add to waitlist
    await db.insert(waitlist).values({
      email,
      source: "website",
    })

    // TODO: Send confirmation email via Resend
    // await sendWaitlistConfirmation(email)

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Waitlist error:", error)
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    )
  }
}
