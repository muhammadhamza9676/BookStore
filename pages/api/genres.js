import { connectToDatabase } from '@/lib/db';
import GenreModel from '@/models/Genre';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const genres = await GenreModel.find();

    if (!genres || genres.length === 0) {
      return res.status(404).json({ error: 'No genres found' });
    }

    res.status(200).json({ genres });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
