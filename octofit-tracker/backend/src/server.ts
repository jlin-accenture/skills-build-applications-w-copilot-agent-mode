import express from 'express';
import './config/database';
import apiRouter from './routes';

export const app = express();
export const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

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

export function startServer() {
  return app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
  });
}
