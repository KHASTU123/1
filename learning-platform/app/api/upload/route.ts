// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), '/public/uploads')
  fs.mkdirSync(uploadDir, { recursive: true })

  const form = new IncomingForm({ uploadDir, keepExtensions: true })
  
  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        reject(NextResponse.json({ error: 'Upload failed' }, { status: 500 }))
      } else {
        resolve(NextResponse.json({ success: true }))
      }
    })
  })
}
