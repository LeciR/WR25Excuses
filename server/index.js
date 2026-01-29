import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001
const DATA_FILE = path.join(__dirname, 'data.json')

app.use(cors())
app.use(express.json())

// Initialize data file if it doesn't exist
async function initDataFile() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]))
  }
}

// Read excuses from file
async function readExcuses() {
  const data = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

// Write excuses to file
async function writeExcuses(excuses) {
  await fs.writeFile(DATA_FILE, JSON.stringify(excuses, null, 2))
}

// Get all excuses
app.get('/api/excuses', async (req, res) => {
  try {
    const excuses = await readExcuses()
    res.json(excuses)
  } catch (error) {
    res.status(500).json({ error: 'Failed to read excuses' })
  }
})

// Add new excuse
app.post('/api/excuses', async (req, res) => {
  try {
    const { text } = req.body
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Excuse text is required' })
    }

    const excuses = await readExcuses()
    const newExcuse = {
      id: Date.now(),
      text: text.trim(),
      votes: 0
    }
    excuses.push(newExcuse)
    await writeExcuses(excuses)
    res.status(201).json(newExcuse)
  } catch (error) {
    res.status(500).json({ error: 'Failed to add excuse' })
  }
})

// Upvote an excuse
app.post('/api/excuses/:id/upvote', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const excuses = await readExcuses()
    const excuse = excuses.find(e => e.id === id)

    if (!excuse) {
      return res.status(404).json({ error: 'Excuse not found' })
    }

    excuse.votes += 1
    await writeExcuses(excuses)
    res.json(excuse)
  } catch (error) {
    res.status(500).json({ error: 'Failed to upvote excuse' })
  }
})

await initDataFile()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
