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

export const deleteFromCart = createAsyncThunk(
  'userorder/deleteFromCart',
  async (orderID: number, { dispatch }) => {
    const response = await axios.delete(`/api/cart/${orderID}/`)
    dispatch(userOrderActions.deleteFromCart({ targetId: orderID }))
    return response.data
  }
)


export const purchaseWithCredit = createAsyncThunk(
  'userorder/purchaseWithCredit',
  async (shippingFee: number) => {
    // console.log(`shippingFee: ${shippingFee}`)
    const response = await axios.get(`/api/purchase/${shippingFee}`)
    return response.data
  }
)

export const userOrderSlice = createSlice({
  name: 'userorder',
  initialState,
  reducers: {
    deleteFromCart: (state, action: PayloadAction<{ targetId: number }>) => {
      state.cart = state.cart.filter((value) => {
        return value.id !== action.payload.targetId
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
export const selectUserOrder = (state: RootState): UserOrderState => state.userorder

export default userOrderSlice.reducer
