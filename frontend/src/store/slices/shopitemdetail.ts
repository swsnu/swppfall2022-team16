import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const fetchDetails = createAsyncThunk(
    "shopitemdetail/fetchDetails",
    async (item_id : number) => {
        const response = await axios.get<ShopItemDetailInfo[]>(`/api/shopitem/${item_id}/shopitemdetail/`)
        return response.data
    }
)

export const shopitemDetailSlice = createSlice({
    name: "shopitemDetail",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchDetails.fulfilled, (state, action) => {
            state.shopitem_details = action.payload
        })
    },
});

export const shopitemDetailActions = shopitemDetailSlice.actions;

export default shopitemDetailSlice.reducer;