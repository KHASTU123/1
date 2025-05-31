import { connectDB } from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function GET() {
  const db = await connectDB()
  const scores = await db.collection('scores').find().toArray()
  const tests = await db.collection('test_results').find().toArray()
  const videos = await db.collection('video_answers').find().toArray()
  return NextResponse.json({ scores, tests, videos })
}
