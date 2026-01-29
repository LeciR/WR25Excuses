import { useState } from 'react'

const EXCUSE_TEMPLATES = [
  "I forgot my laptop charger at home...",
  "My dog ate my homework (seriously)...",
  "I was stuck in traffic for hours...",
  "My alarm didn't go off this morning...",
  "I had a family emergency...",
  "My internet connection was down...",
  "I wasn't feeling well...",
  "I had car trouble..."
]

function ExcuseForm({ onSubmit }) {
  const [currentExcuse, setCurrentExcuse] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentExcuse.trim()) {
      onSubmit(currentExcuse)
      setCurrentExcuse('')
    }
  }

  const handleTemplateClick = (template) => {
    setCurrentExcuse(template)
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          color: '#333'
        }}>
          Submit Your Excuse
        </label>
        <input
          type="text"
          value={currentExcuse}
          onChange={(e) => setCurrentExcuse(e.target.value)}
          placeholder="Enter your excuse or pick a template below..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4A90E2'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#666'
        }}>
          💡 Quick Templates:
        </label>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {EXCUSE_TEMPLATES.map((template, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleTemplateClick(template)}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                color: '#555',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e8f4fd'
                e.target.style.borderColor = '#4A90E2'
                e.target.style.color = '#4A90E2'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f5f5f5'
                e.target.style.borderColor = '#ddd'
                e.target.style.color = '#555'
              }}
            >
              {template}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '600',
          color: 'white',
          backgroundColor: '#4A90E2',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#357ABD'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4A90E2'}
      >
        Submit Excuse
      </button>
    </form>
  )
}

export default ExcuseForm
