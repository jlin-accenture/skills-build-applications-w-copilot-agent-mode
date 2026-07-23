import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 13, max: 100, required: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    weeklyGoalMinutes: { type: Number, min: 30, max: 2000, required: true },
  },
  { timestamps: true }
);

const User = models.User || model('User', userSchema);

export default User;
