import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExcuses, addExcuse, upvoteExcuse } from './store/excusesSlice'
import ExcuseForm from './ExcuseForm'
import ExcuseList from './ExcuseList'

function App() {
  const dispatch = useDispatch()
  const excuses = useSelector((state) => state.excuses.items)
  const loading = useSelector((state) => state.excuses.loading)

  useEffect(() => {
    dispatch(fetchExcuses())
  }, [dispatch])

  const handleAddExcuse = (excuse) => {
    dispatch(addExcuse(excuse))
  }

  const handleUpvote = (id) => {
    dispatch(upvoteExcuse(id))
  }

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Winter Rally 2025 Student Excuses</h1>
      <ExcuseForm onSubmit={handleAddExcuse} />
      <ExcuseList excuses={excuses} onUpvote={handleUpvote} />
    </div>
  )
}

export default App
