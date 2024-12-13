import { connectToDatabase } from '@/lib/db';
import BookModel from '@/models/Book';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    const featuredBooks = await BookModel.find({ featured: true });
    return res.status(200).json(featuredBooks);
  } catch (error) {
    console.error('Error fetching featured books:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
