import { configureStore } from '@reduxjs/toolkit'
import excusesReducer from './excusesSlice'

export const store = configureStore({
  reducer: {
    excuses: excusesReducer
  }
})
