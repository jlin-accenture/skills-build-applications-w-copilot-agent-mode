import { Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'swim', 'walk'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    caloriesBurned: { type: Number, min: 1, required: true },
    distanceKm: { type: Number, min: 0 },
    occurredAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Activity = models.Activity || model('Activity', activitySchema);

export default Activity;
