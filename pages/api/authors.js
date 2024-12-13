import { connectToDatabase } from '@/lib/db';
import AuthorModel from '@/models/Author';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {

    await connectToDatabase();

    const authors = await AuthorModel.find();

    if (!authors || authors.length === 0) {
      return res.status(404).json({ error: 'No authors found' });
    }

    res.status(200).json({ authors });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

