import { useEffect, useMemo, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && payload.data && Array.isArray(payload.data.items)) {
    return payload.data.items
  }
  return []
}

function Leaderboard() {
  const [leaderboards, setLeaderboards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  useEffect(() => {
    let isMounted = true

    async function fetchLeaderboard() {
      try {
        const response = await fetch(apiEndpoint)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (isMounted) {
          setLeaderboards(normalizeCollection(payload))
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unknown error')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchLeaderboard()
    return () => {
      isMounted = false
    }
  }, [apiEndpoint])

  const latestBoard = useMemo(() => leaderboards[0], [leaderboards])

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && !latestBoard && <p>No leaderboard data available.</p>}
      {!loading && !error && latestBoard && (
        <>
          <p className="text-body-secondary mb-3">
            Period: {latestBoard.period} | Season: {latestBoard.season}
          </p>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {(latestBoard.entries || []).map((entry) => (
                  <tr key={`${entry.rank}-${entry.user?._id || entry.user?.id || entry.points}`}>
                    <td>{entry.rank}</td>
                    <td>{entry.user?.name || '-'}</td>
                    <td>{entry.user?.email || '-'}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}

export default Leaderboard
