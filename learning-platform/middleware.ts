import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!, {
    issuer: "learning-platform",
    audience: "learning-platform-users",
  }) as any
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value
  const url = req.nextUrl.clone()

  // Nếu đang truy cập trang login hoặc register
  if (url.pathname === "/login" || url.pathname === "/register") {
    if (token) {
      try {
        const decoded = verifyToken(token)
        // Nếu token hợp lệ, redirect theo role
        if (decoded.role === "admin") {
          url.pathname = "/admin"
          return NextResponse.redirect(url)
        } else {
          url.pathname = "/dashboard"
          return NextResponse.redirect(url)
        }
      } catch {
        // token không hợp lệ, cho phép vào login/register
      }
    }
    return NextResponse.next() // Không có token, cho phép vào login/register
  }

  // Bảo vệ route admin
  if (url.pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", url))

    try {
      const decoded = verifyToken(token)
      if (decoded.role !== "admin") return NextResponse.redirect(new URL("/", url))
    } catch {
      return NextResponse.redirect(new URL("/login", url))
    }
  }

  // Bảo vệ route dashboard, profile
  if (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/profile")) {
    if (!token) return NextResponse.redirect(new URL("/login", url))

    try {
      verifyToken(token)
    } catch {
      return NextResponse.redirect(new URL("/login", url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*", "/login", "/register"],
}
