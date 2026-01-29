import { useState, useEffect } from 'react'

function ExcuseList({ excuses, onUpvote }) {
  const [votedExcuses, setVotedExcuses] = useState(new Set())

  useEffect(() => {
    const savedVotes = localStorage.getItem('votedExcuses')
    if (savedVotes) {
      setVotedExcuses(new Set(JSON.parse(savedVotes)))
    }
  }, [])

  const handleUpvote = (id) => {
    if (votedExcuses.has(id)) return

    onUpvote(id)
    const newVotedExcuses = new Set(votedExcuses)
    newVotedExcuses.add(id)
    setVotedExcuses(newVotedExcuses)
    localStorage.setItem('votedExcuses', JSON.stringify([...newVotedExcuses]))
  }

  const sortedExcuses = [...excuses].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Submitted Excuses:</h2>
      {sortedExcuses.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No excuses submitted yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sortedExcuses.map((excuse) => {
            const hasVoted = votedExcuses.has(excuse.id)
            return (
              <div
                key={excuse.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '16px',
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'}
              >
                <button
                  onClick={() => handleUpvote(excuse.id)}
                  disabled={hasVoted}
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: hasVoted ? '#999' : '#4A90E2',
                    backgroundColor: hasVoted ? '#f5f5f5' : 'white',
                    border: `2px solid ${hasVoted ? '#ddd' : '#4A90E2'}`,
                    borderRadius: '6px',
                    cursor: hasVoted ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    opacity: hasVoted ? 0.6 : 1
                  }}
                  onMouseOver={(e) => {
                    if (!hasVoted) {
                      e.target.style.backgroundColor = '#4A90E2'
                      e.target.style.color = 'white'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!hasVoted) {
                      e.target.style.backgroundColor = 'white'
                      e.target.style.color = '#4A90E2'
                    }
                  }}
                >
                  {hasVoted ? '✓ Voted' : 'Upvote'}
                </button>
                <span style={{ fontWeight: 'bold', minWidth: '50px', fontSize: '18px', color: '#333' }}>
                  {excuse.votes} 👍
                </span>
                <span style={{ flex: 1, color: '#555', fontSize: '16px' }}>{excuse.text}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ExcuseList
