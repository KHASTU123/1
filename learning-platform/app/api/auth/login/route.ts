import connectDB from '@/lib/mongo'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const db = await connectDB()
  const user = await db.collection('users').findOne({ email })

  if (!user) {
    return NextResponse.json({ error: 'Email không tồn tại' }, { status: 401 })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return NextResponse.json({ error: 'Mật khẩu không đúng' }, { status: 401 })
  }

  const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  return NextResponse.json({ token, role: user.role })
}
