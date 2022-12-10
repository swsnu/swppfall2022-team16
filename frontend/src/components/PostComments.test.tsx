import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { CommentState } from '../store/slices/comment'
import { UserState } from '../store/slices/user'
import { renderWithProviders, stubCommentState, stubLoginUserState, stubUserState } from '../test-utils/mock'
import PostComments from './PostComments'

const renderPostComments = (commentState: CommentState, userState: UserState): any => {
  renderWithProviders(
    <PostComments review_id={1} />, { preloadedState: { comment: commentState, user: userState } }
  )
}

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

describe('<PostComments />', () => {
  it('should render without errors', () => {
    renderPostComments(stubCommentState, stubUserState)
  })
  it('should handle edit comment', async() => {
    window.prompt = jest.fn().mockReturnValueOnce('comment')
    renderPostComments(stubCommentState, stubLoginUserState)
    fireEvent.click(await screen.findByTestId('edit'))
    fireEvent.click(screen.getByTestId('delete'))
  })
  it('should handle edit comment with cancelled', async() => {
    window.prompt = jest.fn().mockReturnValueOnce(null)
    renderPostComments(stubCommentState, stubLoginUserState)
    fireEvent.click(await screen.findByTestId('edit'))
  })
  it('should handle edit comment with empty value', async() => {
    window.prompt = jest.fn().mockReturnValueOnce('')
    renderPostComments(stubCommentState, stubLoginUserState)
    fireEvent.click(await screen.findByTestId('edit'))
  })
})
