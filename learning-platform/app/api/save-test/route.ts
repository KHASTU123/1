export async function POST(req: Request) {
  const body = await req.json()
  const correctCount = body.results.filter((r: any) => r.selected === r.correct).length
  const score = (correctCount / body.results.length) * 100

  const db = await connectDB()
  await db.collection('test_results').insertOne({
    ...body,
    score,
    takenAt: new Date(),
  })

  return NextResponse.json({ success: true, score })
}
