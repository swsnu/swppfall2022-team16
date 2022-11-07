import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface UserOrderInfo {
    id: number
    user_id: number
    ordered_item: number
    order_status: string
}

export interface UserOrderState {
    userOrders: UserOrderInfo[]
}

const initialState : UserOrderState = {
    userOrders: []
}

export const fetchOrders = createAsyncThunk(
    "userorder/fetchOrders",
    async () => {
        const response = await axios.get<UserOrderInfo[]>('/api/userorder/')
        return response.data
    }
)

export const userOrderSlice = createSlice({
    name: "userorder",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.userOrders = action.payload
        })
    },
});

export const userOrderActions = userOrderSlice.actions;

export default userOrderSlice.reducer;