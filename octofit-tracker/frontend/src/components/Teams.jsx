import { useEffect, useState } from 'react'

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

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/teams/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (isMounted) {
          setTeams(normalizeCollection(payload))
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

    fetchTeams()
    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <article className="col-12 col-md-6" key={team._id || team.id || team.name}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h5 card-title">{team.name}</h3>
                  <p className="card-text mb-1">City: {team.city || '-'}</p>
                  <p className="card-text mb-1">Slogan: {team.slogan || '-'}</p>
                  <p className="card-text mb-0">Points: {team.totalPoints ?? '-'}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
