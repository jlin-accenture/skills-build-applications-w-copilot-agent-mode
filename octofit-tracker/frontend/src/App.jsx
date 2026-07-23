import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  const runtimeLabel = codespaceName ? 'Codespaces URL' : 'Localhost fallback'

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-2">OctoFit Tracker Dashboard</h1>
        <p className="mb-1 text-body-secondary">
          Runtime: <strong>{runtimeLabel}</strong>
        </p>
        <p className="mb-0">
          API Base URL: <code>{apiBaseUrl}</code>
        </p>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        <NavLink className="nav-link" to="/users">
          Users
        </NavLink>
        <NavLink className="nav-link" to="/teams">
          Teams
        </NavLink>
        <NavLink className="nav-link" to="/activities">
          Activities
        </NavLink>
        <NavLink className="nav-link" to="/leaderboard">
          Leaderboard
        </NavLink>
        <NavLink className="nav-link" to="/workouts">
          Workouts
        </NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route
            path="/activities"
            element={<Activities apiBaseUrl={apiBaseUrl} />}
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard apiBaseUrl={apiBaseUrl} />}
          />
          <Route
            path="/workouts"
            element={<Workouts apiBaseUrl={apiBaseUrl} />}
          />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
