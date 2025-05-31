'use client'
import { useState } from 'react'

export default function VideoPage() {
  const [answer, setAnswer] = useState('')

  const handleSubmit = async () => {
    await fetch('/api/save-video', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'abc123',
        videoId: 'v01',
        question: 'Bạn học được gì từ video?',
        answer,
        submittedAt: new Date()
      })
    })
    alert('Đã gửi câu trả lời!')
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Xem video và trả lời</h2>
      <video controls className="w-full mb-4">
        <source src="/videos/sample.mp4" type="video/mp4" />
      </video>
      <textarea
        placeholder="Trả lời tại đây..."
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full h-32 p-2 border"
      />
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded mt-2">Gửi</button>
    </div>
  )
}
