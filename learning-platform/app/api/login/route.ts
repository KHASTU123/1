import connectDB from '@/lib/mongo'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const db = await connectDB()
  const user = await db.collection('users').findOne({ email })

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Sai thông tin' }, { status: 401 })
  }

  const token = jwt.sign(
    { email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' } // token hết hạn sau 7 ngày
  )

  const response = NextResponse.json({ role: user.role })

  // Gắn token vào cookie
  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 ngày
  })

  return response
}
