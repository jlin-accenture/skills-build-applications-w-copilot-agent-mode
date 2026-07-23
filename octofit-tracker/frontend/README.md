# OctoFit Tracker Frontend

This React 19 + Vite presentation tier uses react-router-dom for navigation
and fetches data from the OctoFit backend API.

## Environment variable

Define VITE_CODESPACE_NAME in octofit-tracker/frontend/.env.local when
running in Codespaces.

Example:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When VITE_CODESPACE_NAME is set, the frontend calls endpoints under:

https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

When VITE_CODESPACE_NAME is not set, the frontend safely falls back to:

http://localhost:8000/api/[component]/

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
