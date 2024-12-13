import { connectToDatabase } from '@/lib/db';
import BookModel from '@/models/Book';
import GenreModel from '@/models/Genre';
import AuthorModel from '@/models/Author';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const book = await BookModel.findOne({ id });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const genre = await GenreModel.findOne({ id: book.genreId });
    const author = await AuthorModel.findOne({ id: book.authorId });

    res.status(200).json({
      book,
      genre: genre ? genre.name : null,
      author: author ? author.name : null,
    });
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
