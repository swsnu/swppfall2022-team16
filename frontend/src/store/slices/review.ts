import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..';

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface ReviewInfo {
    id: number
    title: string
    content: string
    author: number
}

export interface ReviewState {
    reviews: ReviewInfo[]
}

const initialState : ReviewState = {
    reviews: []
}

export const fetchReviews = createAsyncThunk(
    "review/fetchReviews",
    async () => {
        const response = await axios.get<ReviewInfo[]>('/api/review/')
        return response.data
    }
)

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviews = action.payload
        })
    },
});

export const reviewActions = reviewSlice.actions;
export const selectReview = (state: RootState) => state.review

export default reviewSlice.reducer;