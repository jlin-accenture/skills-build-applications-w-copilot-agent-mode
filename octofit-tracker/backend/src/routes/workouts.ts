import { Router } from 'express';
import Workout from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;
