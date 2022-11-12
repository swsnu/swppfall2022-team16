import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit"
import axios from "axios"
import { getMockStore, stubCommentState, stubNoReviewState, stubReviewState } from "../../test-utils/mock"
import reducer, { deleteReview, fetchReviews, postReview, putReview, ReviewState } from "./review"

describe('review reducer', () => {
  let store: EnhancedStore<
    { review: ReviewState },
    AnyAction,
    [ThunkMiddleware<{ review: ReviewState }, AnyAction, undefined>]
  >
  beforeEach(() => {
    store = configureStore({ reducer: { review: reducer } })
  })
  it('should use correct initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      reviews: [],
      current_review: null
    })
  })
  it('should handle fetchReviews', async () => {
    const reviews = stubReviewState
    axios.get = jest.fn().mockResolvedValueOnce({
      data: reviews
    })
    await store.dispatch(fetchReviews())
  })
  it('should handle postReview', async () => {
    const review = stubReviewState.reviews[0]
    axios.post = jest.fn().mockResolvedValueOnce({
      data: review
    })
    await store.dispatch(postReview({
      title: 'title',
      content: 'content1',
      review_item: 1,
      rating: 1
    }))
  })
  it('should handle putReview', async () => {
    store = getMockStore({ review: stubReviewState })
    const review = stubReviewState.reviews[0]
    axios.put = jest.fn().mockResolvedValueOnce({
      data: review
    })
    await store.dispatch(putReview(review))
  })
  it('should handle deleteReview', async () => {
    store = getMockStore({ review: stubReviewState })
    axios.delete = jest.fn().mockResolvedValueOnce({})
    await store.dispatch(deleteReview(1))
  })
})
