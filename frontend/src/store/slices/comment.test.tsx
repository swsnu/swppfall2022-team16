import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit"
import axios from "axios"
import { getMockStore, stubCommentState } from "../../test-utils/mock"
import reducer, { CommentState, deleteComment, fetchComments, postComment, putComment } from "./comment"

describe('comment reducer', () => {
  let store: EnhancedStore<
    { comment: CommentState },
    AnyAction,
    [ThunkMiddleware<{ comment: CommentState }, AnyAction, undefined>]
  >
  beforeEach(() => {
    store = configureStore({ reducer: { comment: reducer } })
  })
  it('should use correct initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      comments: []
    })
  })
  it('should handle fetchComments', async () => {
    const comments = stubCommentState
    axios.get = jest.fn().mockResolvedValueOnce({
      data: comments
    })
    await store.dispatch(fetchComments(1))
  })
  it('should handle postComment', async () => {
    const comment = stubCommentState.comments[0]
    axios.post = jest.fn().mockResolvedValueOnce({
      data: comment
    })
    await store.dispatch(postComment({ review_id: 1, content: 'content1' }))
  })
  it('should handle putComment', async () => {
    store = getMockStore({ comment: stubCommentState })
    const comment = stubCommentState.comments[0]
    axios.put = jest.fn().mockResolvedValueOnce({
      data: comment
    })
    await store.dispatch(putComment(comment))
  })
  it('should handle deleteComment', async () => {
    store = getMockStore({ comment: stubCommentState })
    axios.delete = jest.fn().mockResolvedValueOnce({})
    await store.dispatch(deleteComment(1))
  })
})
