import mongoose from 'mongoose';

/* RecipeSchema will correspond to the recipe collection in the MongoDB database. */
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userId: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  datetime__start: {
    type: Date,
    required: true,
  },
  datetime__end: {
    type: Date,
    required: true,
  },
  pay: {
    type: Number,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

jobSchema.path('pay').get(function (p: number) {
  return (p / 100).toFixed(2);
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
