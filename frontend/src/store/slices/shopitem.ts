import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..';

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface ShopItemInfo {
    id: number
    name: string
    seller: number
    price: number
    rating: number
    star: number
    type: string
}

export interface ShopItemState {
    shopitems: ShopItemInfo[]
}

const initialState : ShopItemState = {
    shopitems: []
}

export const fetchMainItems = createAsyncThunk(
    "shopitem/fetchMainItems",
    async () => {
        const response = await axios.get<ShopItemInfo[]>('/api/shopitem/')
        return response.data
    }
)

export const shopitemSlice = createSlice({
    name: "shopitem",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchMainItems.fulfilled, (state, action) => {
            state.shopitems = action.payload
        })
    },
});

export const shopitemActions = shopitemSlice.actions;
export const selectShopItem = (state: RootState) => state.shopitem

export default shopitemSlice.reducer;