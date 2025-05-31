import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function analyzeUser(data: any) {
  const prompt = `
Dữ liệu học sinh:
- Điểm: ${JSON.stringify(data.scores)}
- Test logic: ${data.logicScore}%
- Video trả lời: "${data.videoAnswer}"

Hỏi: Nên chọn ngành gì?
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  })

  return response.choices[0].message.content
}
