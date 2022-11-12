import React from 'react'
import { CommentState } from '../store/slices/comment'
import { UserState } from '../store/slices/user'
import { renderWithProviders, stubCommentState, stubUserState } from '../test-utils/mock'
import PostComments from './PostComments'

const renderPostComments = (commentState: CommentState, userState: UserState): any => {
  renderWithProviders(
    <PostComments review_id={1} />, { preloadedState: { comment: commentState, user: userState } }
  )
}

describe('<PostComments />', () => {
  it('should render without errors', () => {
    renderPostComments(stubCommentState, stubUserState)
  })
})
