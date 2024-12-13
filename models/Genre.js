import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
      },
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.models.Genre || mongoose.model('Genre', GenreSchema);

export default Genre;
