import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface UserOrderInfo {
    id: number
    credit: number
    cart: string
    favorite_clothes : string
    purchased_item : string
}

export interface UserOrderState {
    userOrders: UserOrderInfo[]
}

const initialState : UserOrderState = {
    userOrders: []
}

export const userOrderSlice = createSlice({
    name: "userorder",
    initialState,
    reducers:{},
    extraReducers: (builder) => {},
});

export const userOrderActions = userOrderSlice.actions;

export default userOrderSlice.reducer;