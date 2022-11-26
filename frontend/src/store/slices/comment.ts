import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'


/* eslint no-multiple-empty-lines: "error" */

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export interface CommentInfo {
  id: number
  review: number
  content: string
  author: number
}

export interface CommentState {
  comments: CommentInfo[]
}

const initialState: CommentState = {
  comments: []
}

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (reviewId: number) => {
    const response = await axios.get<CommentInfo[]>(`/api/review/${reviewId}/comment/`)
    return response.data
  }
)

export const postComment = createAsyncThunk(
  'comment/postComment', async (
    data: {
      review_id: number
      content: string
    }, { dispatch }) => {
    const response = await axios.post(`/api/review/${data.review_id}/comment/`, { content: data.content })
    dispatch(commentActions.postComment(response.data))
  })

export const putComment = createAsyncThunk(
  'comment/putComment', async (commment: CommentInfo, { dispatch }) => {
    await axios.put(`/api/comment/${commment.id}/`, commment)
    dispatch(commentActions.putComment(commment))
  })

export const deleteComment = createAsyncThunk(
  'comment/deleteComment', async (id: number, { dispatch }) => {
    await axios.delete(`/api/comment/${id}/`)
    dispatch(commentActions.deleteComment({ targetId: id }))
  })

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    putComment: (state, action: PayloadAction<CommentInfo>) => {
      state.comments = state.comments.map(
        (value) => {
          if (value.id === action.payload.id) { return action.payload } else return value
        }
      )
    },
    postComment: (state, action: PayloadAction<CommentInfo>) => {
      state.comments.push(action.payload)
    },
    deleteComment: (state, action: PayloadAction<{ targetId: Number }>) => {
      state.comments = state.comments.filter(
        (value) => { return value.id !== action.payload.targetId }
      )
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      const reviewId = action.meta.arg
      state.comments = state.comments.filter((comment) => comment.review !== reviewId)
        .concat(action.payload)
    })
  }
})

export const commentActions = commentSlice.actions
export const selectComment = (state: RootState): CommentState => state.comment

export default commentSlice.reducer
