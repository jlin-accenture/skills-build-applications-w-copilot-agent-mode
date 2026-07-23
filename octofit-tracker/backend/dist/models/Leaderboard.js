"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, min: 0, required: true },
    rank: { type: Number, min: 1, required: true },
}, { _id: false });
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, enum: ['weekly', 'monthly'], required: true },
    season: { type: String, required: true, trim: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
    generatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Leaderboard = mongoose_1.models.Leaderboard || (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = Leaderboard;
