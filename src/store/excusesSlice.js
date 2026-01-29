import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'http://localhost:3001/api'

// Async thunks for API calls
export const fetchExcuses = createAsyncThunk(
  'excuses/fetchExcuses',
  async () => {
    const response = await fetch(`${API_URL}/excuses`)
    return response.json()
  }
)

export const addExcuse = createAsyncThunk(
  'excuses/addExcuse',
  async (text) => {
    const response = await fetch(`${API_URL}/excuses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
    return response.json()
  }
)

export const upvoteExcuse = createAsyncThunk(
  'excuses/upvoteExcuse',
  async (id) => {
    const response = await fetch(`${API_URL}/excuses/${id}/upvote`, {
      method: 'POST'
    })
    return response.json()
  }
)

const excusesSlice = createSlice({
  name: 'excuses',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch excuses
      .addCase(fetchExcuses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchExcuses.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchExcuses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Add excuse
      .addCase(addExcuse.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Upvote excuse
      .addCase(upvoteExcuse.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
  }
})

export default excusesSlice.reducer
