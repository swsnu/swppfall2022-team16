import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'

export interface UserInfo {
  id: number
}

export interface ProductInfo {
  img_url: string
  name: string
}

export interface PostInfo {
  img_url: string
  title: string
}

export interface OrderInfo {
  item_id: number
}

export interface BridgeusState {
  login_info: UserInfo | null
}

const initialState: BridgeusState = {
  login_info: null
}

export const login = createAsyncThunk(
  'bridgeus/login',
  async (form: { email: string, password: string }, { dispatch }) => {
    const response = await axios.post('/api/signup/', form)
    return response.data
  }
)

export const bridgeusSlice = createSlice({
  name: 'bridgeus',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.login_info = null
    })
  }
})

export const bridgeusActions = bridgeusSlice.actions
export const selectbridgeus = (state: RootState) => state.bridgeus

export default bridgeusSlice.reducer
