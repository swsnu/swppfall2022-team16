import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface CommentInfo {
    id: number
    review: number
    content: string
    author: number
}

export interface CommentState {
    comments: CommentInfo[]
}

const initialState : CommentState = {
    comments: []
}

export const fetchComments = createAsyncThunk(
    "comment/fetchComments",
    async (review_id : number) => {
        const response = await axios.get<CommentInfo[]>(`/api/review/${review_id}/comment/`)
        return response.data
    }
)

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload
        })
    },
});

export const reviewActions = commentSlice.actions;

export default commentSlice.reducer;