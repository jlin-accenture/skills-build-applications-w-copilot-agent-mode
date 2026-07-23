import { Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    slogan: { type: String, required: true, trim: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

const Team = models.Team || model('Team', teamSchema);

export default Team;
