'use client'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/admin-data').then(res => res.json()).then(setData)
  }, [])

  if (!data) return <p className="p-4">Đang tải dữ liệu...</p>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Trang Admin - Tổng hợp dữ liệu</h1>

      <section>
        <h2 className="font-semibold text-lg">Điểm số</h2>
        {data.scores.map((s: any, i: number) => (
          <div key={i} className="p-2 border rounded">
            {s.userId}: Toán {s.scores.math}, Lý {s.scores.science}, Logic {s.scores.logic}
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-semibold text-lg">Kết quả Test</h2>
        {data.tests.map((t: any, i: number) => (
          <div key={i} className="p-2 border rounded">
            {t.userId} - {t.type}:
            <ul className="ml-4">
              {t.results.map((r: any, j: number) => (
                <li key={j}>
                  {r.question} → <b>{r.selected}</b> {r.selected === r.correct ? '✅' : '❌'}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-semibold text-lg">Trả lời Video</h2>
        {data.videos.map((v: any, i: number) => (
          <div key={i} className="p-2 border rounded">
            {v.userId}: {v.answer}
          </div>
        ))}
      </section>
    </div>
  )
}
