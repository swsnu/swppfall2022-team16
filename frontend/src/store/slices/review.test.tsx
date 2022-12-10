import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit"
import axios from "axios"
import { getMockStore, stubCommentState, stubNoReviewState, stubReviewState } from "../../test-utils/mock"
import reducer, { deleteReview, fetchReview, fetchReviews, fetchTrendingPosts, likePost, postReview, putReview, ReviewState } from "./review"

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
      current_review: null,
      trending_posts: [],
    })
  })
  it('should handle fetchReviews', async () => {
    const reviews = stubReviewState
    axios.get = jest.fn().mockResolvedValueOnce({
      data: reviews
    })
    await store.dispatch(fetchReviews())
  })
  it('should handle fetchReview', async () => {
    const reviews = stubReviewState
    axios.get = jest.fn().mockResolvedValueOnce({
      data: reviews.reviews[0]
    })
    await store.dispatch(fetchReview(1))
  })
  it('should handle fetchTrendingPosts', async () => {
    const reviews = stubReviewState
    axios.get = jest.fn().mockResolvedValueOnce({
      data: reviews.trending_posts
    })
    await store.dispatch(fetchTrendingPosts())
  })
  it('should handle postReview', async () => {
    const review = stubReviewState.reviews[0]
    axios.post = jest.fn().mockResolvedValueOnce({
      data: review
    })
    const formData = new FormData()
    formData.append('title', 'title')
    formData.append('content', 'content1')
    formData.append('review_item', "1")
    formData.append('rating', "1")
    await store.dispatch(postReview(formData))
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
  it('should handle likePost', async () => {
    store = getMockStore({ review: stubReviewState })
    axios.post = jest.fn().mockResolvedValueOnce({
      liked_posts: '1,2'
    })
    await store.dispatch(likePost(1))
  })
  it('should handle likePost with error', async () => {
    store = getMockStore({ review: stubReviewState })
    axios.post = jest.fn().mockResolvedValueOnce({
      liked_posts: '1,2'
    })
    await store.dispatch(likePost(3))
  })
})
