import React from 'react'
import { render, screen } from "@testing-library/react"
import { renderWithProviders, stubReviewState, stubShopItemState } from '../test-utils/mock'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ShopItemState } from '../store/slices/shopitem'
import PostPage from './PostPage'

jest.mock('../components/TopBar', () => () => (
  <div data-testid='spyTopBar'></div>
))

jest.mock('../components/Post', () => (props: { id: number }) => (
  <div data-testid='spyPost'></div>
))

jest.mock('../components/PostComments', () => (props: { review_id: number }) => (
  <div data-testid='spyPostComments'></div>
))

jest.mock('../components/Footer', () => () => (
  <div data-testid='spyFooter'></div>
))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderPostPage = () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/community/1']}>
      <Routes>
        <Route path="/community/:id" element={<PostPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('<PostPage />', () => {
  it('should render without errors', () => {
    mockDispatch.mockResolvedValue({
      type: 'review/fetchReview/fulfilled',
      payload: stubReviewState.reviews[0]
    })
    renderPostPage()

    expect(screen.getAllByTestId('spyTopBar')).toHaveLength(1)
    expect(screen.getAllByTestId('spyPost')).toHaveLength(1)
    expect(screen.getAllByTestId('spyPostComments')).toHaveLength(1)
    expect(screen.getAllByTestId('spyFooter')).toHaveLength(1)
  })
})
