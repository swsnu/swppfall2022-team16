import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/*eslint-disable */
/*eslint no-multiple-empty-lines: "error"*/

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface CommentInfo {
    id: number
}

export interface CommentState {
    comments: CommentInfo[]
}

const initialState : CommentState = {
    comments: []
}

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers:{},
    extraReducers: (builder) => {},
});

export const reviewActions = commentSlice.actions;

export default commentSlice.reducer;