import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
// import { RootState } from '..'

/* eslint no-multiple-empty-lines: "error" */

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export interface UserShopInfo {
  id: number
  user_id: number
  credit: number
  cart: string
  favorite_clothes: string
  purchased_item: string
}

export interface UserShopState {
  usershop: UserShopInfo | null
}

const initialState: UserShopState = {
  usershop: null
}

export const fetchUserShop = createAsyncThunk(
  'usershop/fetchUserShop',
  async (_, { dispatch }) => {
    const response = await axios.get<UserShopInfo>('/api/usershop/')
    dispatch(userShopActions.usershop(response.data))
    return response.data
  }
)

export const userShopSlice = createSlice({
  name: 'usershop',
  initialState,
  reducers: {
    usershop: (state, action: PayloadAction<UserShopInfo>) => {
      state.usershop = action.payload
    }
  },
  extraReducers: (builder) => { }
})

export const userShopActions = userShopSlice.actions
export const selectUserShop = (state : RootState) => state.usershop
export default userShopSlice.reducer
