import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..';

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
        console.log(response.data)
        return response.data
    }
)

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            const review_id = action.meta.arg
            console.log("review_id: " + review_id)
            console.log("action.payload: " + (action.payload as CommentInfo[]))
            console.log("action.payload[0]: " + JSON.stringify(action.payload[0]));
            state.comments = state.comments.filter((comment) => comment.review !== review_id)
                                            .concat(action.payload)
            console.log(JSON.stringify(state.comments))
        })
    },
});

export const commentActions = commentSlice.actions;
export const selectComment = (state: RootState) => state.comment;

export default commentSlice.reducer;