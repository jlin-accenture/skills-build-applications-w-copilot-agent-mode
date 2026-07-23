import express from 'express';
import { apiBaseUrl } from './config/apiBaseUrl';
import './config/database';
import apiRouter from './routes';

const app = express();
const port = Number(process.env.PORT) || 8000;
const runtime = process.env.CODESPACE_NAME ? 'codespaces' : 'localhost';

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/config', (_req, res) => {
  res.json({
    runtime,
    port,
    apiBaseUrl,
    codespaceName: process.env.CODESPACE_NAME || null,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
