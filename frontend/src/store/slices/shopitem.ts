import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'
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
    image_url: string
    price: number
    rating: number
    star: number
    type: string
}

export interface ShopItemState {
    shopitems: ShopItemInfo[],
    current_shopitem: ShopItemInfo | null
}

const initialState : ShopItemState = {
    shopitems: [],
    current_shopitem: null
}

export const fetchMainItems = createAsyncThunk(
    "shopitem/fetchMainItems",
    async () => {
        const response = await axios.get<ShopItemInfo[]>('/api/shopitem/')
        return response.data
    }
)

export const postShopItem = createAsyncThunk(
    "shopitem/postShopItem", async (
    shopitem : {
    price : number;
    type : string;
}, {dispatch}) => {
    const response = await axios.post('/api/shopitem/', shopitem);
    dispatch(shopitemActions.postShopItem(response.data));
});

export const putShopItem = createAsyncThunk(
    "shopitem/putShopItem", async (shopitem : ShopItemInfo, {dispatch}) => {
    await axios.put(`/api/shopitem/${shopitem.id}/`, shopitem);
    dispatch(shopitemActions.putShopItem(shopitem));
});

export const deleteShopItem = createAsyncThunk(
    "shopitem/deleteShopItem", async (id : number, {dispatch}) => {
    await axios.delete(`/shopitem/${id}/`);
    dispatch(shopitemActions.deleteShopItem( { targetId : id }));
});


export const shopitemSlice = createSlice({
    name: "shopitem",
    initialState,
    reducers:{
        putShopItem: (state, action: PayloadAction<ShopItemInfo>) => {
            state.shopitems =  state.shopitems.map(
                (value) => {
                    if (value.id === action.payload.id)
                        return action.payload;
                    else return value;    
                }
            );

            state.current_shopitem = action.payload;
        },
        postShopItem: (state, action: PayloadAction<ShopItemInfo>) => {
            state.shopitems.push(action.payload);
            state.current_shopitem = action.payload;
        },
        deleteShopItem: (state, action: PayloadAction<{ targetId : Number }>) => {
            state.shopitems =  state.shopitems.filter(
                (value) => { return value.id !== action.payload.targetId }
            );

            state.current_shopitem = null;
        },    
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMainItems.fulfilled, (state, action) => {
            state.shopitems = action.payload
        })
    },
});

export const shopitemActions = shopitemSlice.actions;
export const selectShopItem = (state: RootState) => state.shopitem

export default shopitemSlice.reducer;