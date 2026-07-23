import { Schema, model, models } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, min: 0, required: true },
    rank: { type: Number, min: 1, required: true },
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    season: { type: String, required: true, trim: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Leaderboard = models.Leaderboard || model('Leaderboard', leaderboardSchema);

export default Leaderboard;
