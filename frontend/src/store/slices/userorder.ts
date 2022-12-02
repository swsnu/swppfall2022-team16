import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'


/* eslint no-multiple-empty-lines: "error" */

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export interface UserOrderInfo {
  id: number
  user_id: number
  item_id: number
  single_price: number 
  status: number
  color: string
  size: string
  ordered_amount: number
  purchased_at: Date
  fast_shipping: boolean
}

export interface UserOrderState {
  userOrders: UserOrderInfo[]
  cart: UserOrderInfo[]
}

const initialState: UserOrderState = {
  userOrders: [],
  cart: []
}

export const fetchOrders = createAsyncThunk(
  'userorder/fetchOrders',
  async () => {
    const response = await axios.get<UserOrderInfo[]>('/api/userorder/')
    return response.data
  }
)

export const fetchCart = createAsyncThunk(
  'userorder/fetchCart',
  async () => {
    const response = await axios.get<UserOrderInfo[]>('/api/cart/')
    return response.data
  }
)

export const addToCart = createAsyncThunk(
  'userorder/addToCart',
  async (order: UserOrderInfo) => {
    const response = await axios.post('/api/cart/', order)
    return response.data
  }
)

// 영인 이것 좀 봐주삼
export const deleteFromCart = createAsyncThunk(
  'userorder/deleteFromCart',
  async (item_id : Number, {dispatch}) =>{
    const response = await axios.delete(`/api/cart/${item_id}`)
    dispatch(userOrderActions.deleteFromCart({ targetId : item_id }))
    return response.data
  }
)


export const purchaseWithCredit = createAsyncThunk(
  'userorder/purchaseWithCredit',
  async () => {
    const response = await axios.get('/api/purchase/')
    return response.data
  }
)

export const userOrderSlice = createSlice({
  name: 'userorder',
  initialState,
  reducers: {
    // 영인 이것도 감사... ㅎㅎ
    deleteFromCart: (state, action: PayloadAction<{ targetId : Number }>) => {
      state.cart = state.cart.filter((value) => {
        return value.item_id !== action.payload.targetId
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload
    })
  }
})

export const userOrderActions = userOrderSlice.actions
export const selectUserOrder = (state: RootState) => state.userorder

export default userOrderSlice.reducer
