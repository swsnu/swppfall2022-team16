import { configureStore } from '@reduxjs/toolkit'
import bridgeusReducer from './slices/bridgeus'

export const store = configureStore({
  reducer: {
    bridgeus: bridgeusReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch