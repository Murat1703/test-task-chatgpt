import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'  
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()



const PORT = process.env.PORT || 5400
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Нет OPENAI_API_KEY в .env')
  process.exit(1)
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const app = express()
app.use(cors())        
app.use(express.json())




app.post('/api/chat', async (req, res) => {
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'No message provided' })
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',      
      messages: [
        { role: 'user', content: message }
      ]
    })

    const reply = response.choices?.[0]?.message?.content || ''
    res.json({ reply })

  } catch (err) {
    console.error('Chat API error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})








// app.listen(PORT, () => {
//   console.log(`🚀 Server listening at http://localhost:${PORT}`)
// })
app.listen(PORT,'0.0.0.0' , () => {
  console.log(`🚀 Server listening at http://0.0.0.0:${PORT}`)
})
