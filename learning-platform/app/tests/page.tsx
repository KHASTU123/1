'use client'
import { useState } from 'react'

export default function TestPage() {
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const data = JSON.parse(event.target?.result as string)
      setQuestions(data)
    }
    reader.readAsText(file)
  }

  const handleSubmit = async () => {
    await fetch('/api/save-test', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'abc123',
        type: 'logic',
        results: questions.map((q, i) => ({
          question: q.question,
          selected: answers[i],
          correct: q.correct
        })),
        takenAt: new Date()
      })
    })
    alert('Đã lưu kết quả test!')
  }

  return (
    <div className="p-4 space-y-4">
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {questions.map((q, i) => (
        <div key={i}>
          <p className="font-semibold">{q.question}</p>
          {q.options.map((opt: string, idx: number) => (
            <div key={idx}>
              <label>
                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt}
                  onChange={() => setAnswers({ ...answers, [i]: opt })}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Nộp bài</button>
    </div>
  )
}
