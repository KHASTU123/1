'use client'
import { useState } from 'react'

export default function ScorePage() {
  const [scores, setScores] = useState({ math: '', science: '', logic: '' })

  const handleSubmit = async () => {
    await fetch('/api/save-score', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'abc123',
        scores: {
          math: Number(scores.math),
          science: Number(scores.science),
          logic: Number(scores.logic),
        },
        updatedAt: new Date(),
      }),
    })
    alert('Đã lưu điểm!')
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Nhập điểm</h1>
      <input placeholder="Toán" onChange={(e) => setScores({ ...scores, math: e.target.value })} />
      <input placeholder="Lý" onChange={(e) => setScores({ ...scores, science: e.target.value })} />
      <input placeholder="Logic" onChange={(e) => setScores({ ...scores, logic: e.target.value })} />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mt-2">Lưu</button>
    </div>
  )
}
