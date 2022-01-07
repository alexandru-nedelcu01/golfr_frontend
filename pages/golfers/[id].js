import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'

const Profile = () => {
  const fetcher = async url => {
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.info = await response.json()
      error.status = response.status
      throw error
    }

    return response.json()
  }

  const router = useRouter()
  const { id } = router.query
  const PROFILE_URL = `${process.env.NEXT_PUBLIC_API_URL}/golfers/${id}`
  const { data, error } = useSWR(PROFILE_URL, fetcher) // data = { name: ..., scores: ...}

  return (
    <Layout>
      <>
        {error ? (
          error.message
        ) : (
          <>
            {data && (<span className="username">{data.name}</span>)}
            {data && (
              data.scores.map(score => (
                <ScoreCard
                  key={score.id}
                  id={score.id}
                  totalScore={score.total_score}
                  playedAt={score.played_at}
                  userId={score.user_id}
                  userName={score.user_name}
                />
              )))}
          </>
        )}
      </>
    </Layout>
  )
}


export default Profile
