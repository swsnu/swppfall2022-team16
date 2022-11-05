import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface ShopItemDetailInfo {
    id: number
}

export interface ShopItemDetailState {
    shopitem_details: ShopItemDetailInfo[]
}

const initialState : ShopItemDetailState = {
    shopitem_details: []
}

export const shopitemDetailSlice = createSlice({
    name: "shopitemDetail",
    initialState,
    reducers:{},
    extraReducers: (builder) => {},
});

export const shopitemDetailActions = shopitemDetailSlice.actions;

export default shopitemDetailSlice.reducer;