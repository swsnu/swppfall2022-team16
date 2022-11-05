import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface ReviewInfo {
    id: number
}

export interface ReviewState {
    reviews: ReviewInfo[]
}

const initialState : ReviewState = {
    reviews: []
}

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers:{},
    extraReducers: (builder) => {},
});

export const reviewActions = reviewSlice.actions;

export default reviewSlice.reducer;