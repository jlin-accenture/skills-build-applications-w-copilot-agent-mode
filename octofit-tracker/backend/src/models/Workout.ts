import { Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, min: 5, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    focusArea: { type: String, required: true, trim: true },
    equipment: { type: [String], default: [] },
    recommendedFor: { type: [String], default: [] },
    caloriesEstimate: { type: Number, min: 1, required: true },
  },
  { timestamps: true }
);

const Workout = models.Workout || model('Workout', workoutSchema);

export default Workout;
