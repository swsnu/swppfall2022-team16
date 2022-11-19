import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface ReviewInfo {
    id: number
    title: string
    content: string
    author: number
    review_item: number
    rating: number
    likes: number
    image_url: string
}

export interface ReviewState {
    reviews: ReviewInfo[],
    current_review: ReviewInfo | null
}

const initialState : ReviewState = {
    reviews: [],
    current_review: null
}

export const fetchReviews = createAsyncThunk(
    "review/fetchReviews",
    async () => {
        const response = await axios.get<ReviewInfo[]>('/api/review/')
        return response.data
    }
)

export const postReview = createAsyncThunk(
    "review/postReview", async (
    review : {
    title: string;
    content: string;
    review_item: number;
    rating: number;
}, {dispatch}) => {
    const response = await axios.post('/api/review/', review);
    return response.data
});

export const putReview = createAsyncThunk(
    "review/putReview", async (review : ReviewInfo, {dispatch}) => {
    await axios.put(`/api/review/${review.id}/`, review);
    dispatch(reviewActions.putReview(review));
});

export const deleteReview = createAsyncThunk(
    "review/deleteReview", async (id : number, {dispatch}) => {
    await axios.delete(`/api/review/${id}/`);
    dispatch(reviewActions.deleteReview( { targetId : id }));
});

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers:{
        putReview: (state, action: PayloadAction<ReviewInfo>) => {
            state.reviews =  state.reviews.map(
                (value) => {
                    if (value.id === action.payload.id)
                        return action.payload;
                    else return value;    
                }
            );

            state.current_review = action.payload;
        },
        deleteReview: (state, action: PayloadAction<{ targetId : Number }>) => {
            state.reviews =  state.reviews.filter(
                (value) => { return value.id !== action.payload.targetId }
            );

            state.current_review = null;
        },    
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviews = action.payload
        })
        builder.addCase(postReview.fulfilled, (state, action) => {
            state.reviews.push(action.payload);
            state.current_review = action.payload;
        })
    },
});

export const reviewActions = reviewSlice.actions;
export const selectReview = (state: RootState) => state.review

export default reviewSlice.reducer;