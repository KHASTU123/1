'use client'
import { useState } from 'react'

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const handleSend = async () => {
    const res = await fetch('/api/gpt-analyze', {
      method: 'POST',
      body: JSON.stringify({ userId: 'abc123', message })
    })
    const data = await res.json()
    setResponse(data.result)
  }

  return (
    <div className="p-4">
      <textarea
        placeholder="Hỏi GPT..."
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-24 p-2 border"
      />
      <button onClick={handleSend} className="bg-purple-600 text-white px-4 py-2 rounded mt-2">Gửi</button>
      <p className="mt-4 bg-gray-100 p-2">{response}</p>
    </div>
  )
}
