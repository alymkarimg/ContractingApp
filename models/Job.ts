import mongoose from 'mongoose';

/* RecipeSchema will correspond to the recipe collection in the MongoDB database. */
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
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

jobSchema.path('pay').get(function (p: any) {
  return (p / 100).toFixed(2);
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
