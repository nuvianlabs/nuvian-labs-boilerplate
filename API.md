# API Documentation

Complete reference for all API endpoints in the Nuvian Labs Boilerplate.

## Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Public Endpoints](#public-endpoints)
- [Protected Endpoints](#protected-endpoints)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## Base URL

**Development**: `http://localhost:3000`
**Production**: `https://your-domain.com`

All endpoints are relative to the base URL.

---

## Authentication

The boilerplate uses Better Auth for authentication. Most dashboard and user-specific endpoints require authentication.

### How Authentication Works

1. User signs in via `/sign-in`
2. Better Auth creates a session
3. Session cookie is set in browser
4. Protected API routes check for valid session

### Making Authenticated Requests

**From Client Components:**
```typescript
// Session is automatically included in cookies
const response = await fetch("/api/protected-endpoint", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ data })
})
```

**From Server Components:**
```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const session = await auth.api.getSession({
  headers: await headers()
})
```

---

## Public Endpoints

### Health Check

Check API and database health.

**Endpoint**: `GET /api/health`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-04T10:30:00.000Z",
  "version": "0.1.0",
  "database": "connected"
}
```

**Status Codes**:
- `200` - Service healthy
- `500` - Service unhealthy (database issue)

**Example**:
```bash
curl http://localhost:3000/api/health
```

---

### Environment Variable Check

Check if a specific environment variable is set (for setup verification).

**Endpoint**: `GET /api/check-env?var=VARIABLE_NAME`

**Query Parameters**:
- `var` (required) - Name of environment variable to check

**Response**:
```json
{
  "exists": true
}
```

**Status Codes**:
- `200` - Check completed
- `400` - Missing `var` parameter

**Example**:
```bash
curl "http://localhost:3000/api/check-env?var=DATABASE_URL"
```

**Usage in Setup Page**:
```typescript
const checkEnvVar = async (varName: string) => {
  const res = await fetch(`/api/check-env?var=${varName}`)
  const data = await res.json()
  return data.exists
}
```

---

### Waitlist Signup

Add an email to the waitlist.

**Endpoint**: `POST /api/waitlist`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Validation**:
- `email` - Must be a valid email address

**Response** (Success):
```json
{
  "success": true,
  "message": "Successfully added to waitlist"
}
```

**Response** (Error - Duplicate):
```json
{
  "error": "Email already on waitlist"
}
```

**Response** (Error - Invalid Email):
```json
{
  "error": "Invalid email address"
}
```

**Status Codes**:
- `200` - Successfully added to waitlist
- `400` - Validation error or duplicate email
- `500` - Server error

**Example**:
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Client Usage**:
```typescript
const joinWaitlist = async (email: string) => {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error)
  }

  return await res.json()
}
```

---

## Authentication Endpoints

### Sign In / Sign Up / Sign Out

All authentication is handled by Better Auth.

**Base**: `/api/auth/*`

**Available Endpoints**:
- `POST /api/auth/sign-in/social` - OAuth sign-in (Google)
- `POST /api/auth/sign-out` - Sign out user
- `GET /api/auth/session` - Get current session
- `POST /api/auth/callback/google` - OAuth callback (automatic)

**Note**: These endpoints are managed by Better Auth and don't need manual implementation.

### Get Session

**Endpoint**: `GET /api/auth/session`

**Response**:
```json
{
  "user": {
    "id": "usr_123abc",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "https://...",
    "emailVerified": true
  },
  "session": {
    "id": "sess_456def",
    "userId": "usr_123abc",
    "expiresAt": "2025-01-11T10:30:00.000Z"
  }
}
```

**Status Codes**:
- `200` - Session exists
- `401` - Not authenticated

**Client Usage**:
```typescript
import { useSession } from "@/lib/auth-client"

const { data: session, isPending } = useSession()
```

---

## Protected Endpoints

Protected endpoints require a valid session. Add authentication checks like this:

```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  // Your protected logic here
  // ...

  return Response.json({ success: true })
}
```

### Example: Create Feature Request

**Endpoint**: `POST /api/feature-requests` _(Example - not yet implemented)_

**Authentication**: Required

**Request Body**:
```json
{
  "title": "Add dark mode",
  "description": "Would love to have a dark mode option"
}
```

**Response**:
```json
{
  "id": "req_123abc",
  "title": "Add dark mode",
  "description": "Would love to have a dark mode option",
  "status": "pending",
  "upvotes": 0,
  "userId": "usr_123abc",
  "createdAt": "2025-01-04T10:30:00.000Z"
}
```

**Status Codes**:
- `200` - Created successfully
- `401` - Not authenticated
- `400` - Validation error
- `500` - Server error

---

## Error Handling

All API endpoints return errors in a consistent format:

### Error Response Format

```json
{
  "error": "Human-readable error message"
}
```

### Common Error Status Codes

| Code | Meaning | When It Occurs |
|------|---------|----------------|
| `400` | Bad Request | Invalid input, validation error |
| `401` | Unauthorized | Not authenticated |
| `403` | Forbidden | Authenticated but not authorized |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource |
| `500` | Internal Server Error | Server-side error |

### Client Error Handling

```typescript
try {
  const res = await fetch("/api/endpoint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Something went wrong")
  }

  const result = await res.json()
  return result

} catch (error) {
  console.error("API Error:", error)
  // Handle error (show toast, etc.)
}
```

---

## Rate Limiting

### Current Implementation

Rate limiting is not yet implemented but can be added using Upstash Redis.

### Recommended Implementation

```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
})

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return Response.json(
      { error: "Too many requests" },
      { status: 429 }
    )
  }

  // Continue with request...
}
```

### Rate Limit Response

```json
{
  "error": "Too many requests"
}
```

**Status Code**: `429 - Too Many Requests`

**Headers**:
- `X-RateLimit-Limit` - Requests allowed per window
- `X-RateLimit-Remaining` - Requests remaining
- `X-RateLimit-Reset` - Time when limit resets

---

## Creating Custom API Routes

### Basic Route

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello World" })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ received: body })
}
```

### Protected Route

```typescript
// app/api/protected/route.ts
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST(request: Request) {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Access user ID
  const userId = session.user.id

  // Your logic here
  return Response.json({ success: true })
}
```

### With Database

```typescript
// app/api/users/route.ts
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  const allUsers = await db.query.users.findMany({
    limit: 10
  })

  return Response.json({ users: allUsers })
}
```

### With Validation

```typescript
// app/api/validate/route.ts
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = schema.parse(body)

    // Use validated data
    return Response.json({ success: true, data: validated })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return Response.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}
```

---

## Best Practices

### 1. Always Validate Input

```typescript
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(120),
})

const validated = schema.parse(body) // Throws if invalid
```

### 2. Use Proper HTTP Methods

- `GET` - Read data (should be idempotent)
- `POST` - Create new resources
- `PUT` - Update entire resource
- `PATCH` - Update partial resource
- `DELETE` - Delete resource

### 3. Return Appropriate Status Codes

```typescript
// Success
return Response.json(data, { status: 200 })  // OK
return Response.json(data, { status: 201 })  // Created

// Client Errors
return Response.json({ error }, { status: 400 })  // Bad Request
return Response.json({ error }, { status: 401 })  // Unauthorized
return Response.json({ error }, { status: 404 })  // Not Found

// Server Errors
return Response.json({ error }, { status: 500 })  // Internal Error
```

### 4. Handle Errors Gracefully

```typescript
try {
  // Your logic
  return Response.json({ success: true })
} catch (error) {
  console.error("API Error:", error)
  return Response.json(
    { error: "Something went wrong" },
    { status: 500 }
  )
}
```

### 5. Add Logging

```typescript
import { logger } from "@/lib/logger" // Use Pino or similar

export async function POST(request: Request) {
  logger.info("API called", { endpoint: "/api/example" })

  try {
    // Your logic
    logger.info("Success")
    return Response.json({ success: true })
  } catch (error) {
    logger.error("Error occurred", { error })
    return Response.json({ error: "Failed" }, { status: 500 })
  }
}
```

### 6. Use TypeScript Types

```typescript
interface CreateUserRequest {
  email: string
  name: string
}

interface CreateUserResponse {
  id: string
  email: string
  name: string
}

export async function POST(request: Request): Promise<Response> {
  const body: CreateUserRequest = await request.json()
  // Type-safe from here
}
```

---

## Testing API Endpoints

### Using curl

```bash
# GET request
curl http://localhost:3000/api/health

# POST request
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# With authentication (copy session cookie from browser)
curl http://localhost:3000/api/protected \
  -H "Cookie: better-auth.session_token=xxx"
```

### Using Postman or Insomnia

1. Import collection (if provided)
2. Set base URL to `http://localhost:3000`
3. Add requests for each endpoint
4. Test with different scenarios

### Automated Testing

```typescript
// __tests__/api/waitlist.test.ts
import { POST } from "@/app/api/waitlist/route"

describe("/api/waitlist", () => {
  it("should add email to waitlist", async () => {
    const request = new Request("http://localhost:3000/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: "test@example.com" })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

---

## Related Documentation

- [AUTH.md](./AUTH.md) - Authentication details
- [DATABASE.md](./DATABASE.md) - Database operations
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common API issues

---

**Need to add more endpoints?** Check the [CONTRIBUTING.md](./CONTRIBUTING.md) guide.
