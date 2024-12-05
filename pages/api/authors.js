import path from 'path'
import fs from 'fs'

export default function handler(req, res) {
  try {

    const filePath = path.join(process.cwd(), 'Data.json')

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Data file not found' })
    }
    const jsonData = fs.readFileSync(filePath, 'utf-8')

    let data;
    try {
      data = JSON.parse(jsonData)
    } catch (error) {
      return res.status(500).json({ error: 'Error parsing JSON data' })
    }

    if (!data.authors || data.authors.length === 0) {
      return res.status(404).json({ error: 'No authors found' })
    }

    res.status(200).json({ authors: data.authors })

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message })
  }
}
