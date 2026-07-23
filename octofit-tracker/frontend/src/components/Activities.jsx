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

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/activities/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (isMounted) {
          setActivities(normalizeCollection(payload))
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

    fetchActivities()
    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Minutes</th>
                <th>Calories</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || `${activity.type}-${activity.occurredAt}`}>
                  <td>{activity.user?.name || '-'}</td>
                  <td>{activity.type || '-'}</td>
                  <td>{activity.durationMinutes ?? '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                  <td>{activity.team?.name || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
