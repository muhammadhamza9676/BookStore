import { connectToDatabase } from '@/lib/db';
import AuthorModel from '@/models/Author';
import BookModel from '@/models/Book';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const author = await AuthorModel.findOne({ id });

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const books = await BookModel.find({ authorId: id });

    res.status(200).json({ author, books });
  } catch (error) {
    console.error('Error fetching author details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
