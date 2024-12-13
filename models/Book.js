import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number },
  featured: { type: Boolean, default: false },
  genreId: { type: String },
  authorId: { type: String },
});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
