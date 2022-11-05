import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'

export interface UserInfo {
  id: number
  name: string
  sex: string
  orders: OrderInfo[]
}

export interface ProductInfo {
  id: number
  img_url: string
  name: string
  seller_id: number
  price: number
  rating: number
}

export interface PostInfo {
  id: number
  img_url: string
  title: string
  content: string
}

export interface OrderInfo {
  item_id: number
}

export interface BridgeusState {
  login_info: UserInfo | null
  users: UserInfo[]
  products: ProductInfo[]
  posts: PostInfo[]
  orders: OrderInfo[]
}

const initialState: BridgeusState = {
  login_info: null,
  users: [],
  products: [],
  posts: [],
  orders: []
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
