import { connectToDatabase } from '@/lib/db';
import BookModel from '@/models/Book';
import GenreModel from '@/models/Genre';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectToDatabase();

        const genre = await GenreModel.findOne({ id });
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        const genreBooks = await BookModel.find({ genreId: id });

        res.status(200).json({
            genre,
            genreBooks,
        });

    } catch (error) {
        console.error('Error fetching genre details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
