import React from 'react'
import { render, screen } from "@testing-library/react"
import { renderWithProviders, stubShopItemState } from '../test-utils/mock'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './SignupPage'
import ReviewPage from './ReviewPage'
import { ShopItemState } from '../store/slices/shopitem'

jest.mock('../components/TopBar', () => () => (
  <div data-testid='spyTopBar'></div>
))

jest.mock('../components/ShopItem', () => (props: { shopItem: ShopItemInfo }) => (
  <div data-testid='spyShopItem'></div>
))

jest.mock('../components/ReviewForm', () => () => (
  <div data-testid='spyReviewForm'></div>
))

jest.mock('../components/Footer', () => () => (
  <div data-testid='spyFooter'></div>
))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderReviewPage = (shopItemState: ShopItemState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/review/1']}>
      <Routes>
        <Route path="/review/:id" element={<ReviewPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState}}
  )
}

describe('<SignupPage />', () => {
  it('should render without errors', () => {
    renderReviewPage(stubShopItemState)
    expect(mockDispatch).toHaveBeenCalled()
    expect(screen.getAllByTestId('spyTopBar')).toHaveLength(1)
    expect(screen.getAllByTestId('spyShopItem')).toHaveLength(1)
    expect(screen.getAllByTestId('spyReviewForm')).toHaveLength(1)
    expect(screen.getAllByTestId('spyFooter')).toHaveLength(1)
  })
})
