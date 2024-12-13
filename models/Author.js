import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  biography: {
    type: String,
    required: true,
    trim: true,
  },
});

const Author = mongoose.models.Author || mongoose.model('Author', AuthorSchema);

export default Author;
