"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const Workout = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
