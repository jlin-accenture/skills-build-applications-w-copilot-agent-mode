"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    type: {
        type: String,
        enum: ['run', 'cycle', 'strength', 'yoga', 'swim', 'walk'],
        required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    caloriesBurned: { type: Number, min: 1, required: true },
    distanceKm: { type: Number, min: 0 },
    occurredAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Activity = mongoose_1.models.Activity || (0, mongoose_1.model)('Activity', activitySchema);
exports.default = Activity;
