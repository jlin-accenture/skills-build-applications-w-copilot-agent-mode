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

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (isMounted) {
          setWorkouts(normalizeCollection(payload))
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

    fetchWorkouts()
    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <article
              className="col-12 col-md-6 col-xl-4"
              key={workout._id || workout.id || workout.name}
            >
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h5 card-title">{workout.name}</h3>
                  <p className="card-text">{workout.description}</p>
                  <p className="card-text mb-1">
                    Duration: {workout.durationMinutes ?? '-'} min
                  </p>
                  <p className="card-text mb-1">Difficulty: {workout.difficulty || '-'}</p>
                  <p className="card-text mb-0">
                    Calories est.: {workout.caloriesEstimate ?? '-'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
