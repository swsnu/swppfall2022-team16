import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
  products: ProductInfo[]
  posts: PostInfo[]
  orders: OrderInfo[]
}

const initialState: BridgeusState = {
  products: [],
  posts: [],
  orders: []
}

export const bridgeusSlice = createSlice({
  name: 'bridgeus',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {  }
})

export const bridgeusActions = bridgeusSlice.actions
export const selectbridgeus = (state: RootState): BridgeusState => state.bridgeus

export default bridgeusSlice.reducer
