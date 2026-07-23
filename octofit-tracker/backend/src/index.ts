import express from 'express';
import { apiBaseUrl } from './config/apiBaseUrl';
import './config/database';
import apiRouter from './routes';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
