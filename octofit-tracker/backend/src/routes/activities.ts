import { Router } from 'express';
import Activity from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ occurredAt: -1 })
      .populate('user', 'name email')
      .populate('team', 'name')
      .lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;
