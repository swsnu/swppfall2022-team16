import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface ShopItemInfo {
    id: number
}

export interface ShopItemState {
    shopitems: ShopItemInfo[]
}

const initialState : ShopItemState = {
    shopitems: []
}

export const shopitemSlice = createSlice({
    name: "shopitem",
    initialState,
    reducers:{},
    extraReducers: (builder) => {},
});

export const shopitemActions = shopitemSlice.actions;

export default shopitemSlice.reducer;