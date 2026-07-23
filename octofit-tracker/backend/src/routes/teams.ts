import { Router } from 'express';
import Team from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('captain members', 'name email').lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;
