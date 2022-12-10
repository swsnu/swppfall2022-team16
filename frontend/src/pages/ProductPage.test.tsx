import React from 'react'
import { fireEvent, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubNoReviewState, stubReviewState, stubShopItemState, stubUserOrderState, stubUserState } from "../test-utils/mock"
import ProductPage from './ProductPage'
import { ShopItemState } from '../store/slices/shopitem'
import { ReviewState } from '../store/slices/review'
import { UserState } from '../store/slices/user'
import { OrderDetailProps } from '../components/OrderDetailForm';

jest.mock('../components/TopBar', () => () => (
  <div data-testid='spyTopBar'></div>
))

jest.mock('../components/OrderDetailForm', () => (props : OrderDetailProps) => (
  <div data-testid='spyOrderDetailForm'></div>
))

jest.mock('../components/Review', () => () => (
  <div data-testid='spyReview'></div>
))

jest.mock('../components/Footer', () => () => (
  <div data-testid='spyFooter'></div>
))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderProductPage = (shopItemState: ShopItemState, reviewState: ReviewState, userState: UserState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/product/1']}>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState, review: reviewState, user: userState}}
  )
}

describe('<ProductPage />', () => {
  it('should render without error', async () => {
    renderProductPage(stubShopItemState, stubReviewState, stubUserState)
    await screen.findByText('name')
  })
  it('should handle the case when there are no reviews', async () => {
    renderProductPage(stubShopItemState, stubNoReviewState, stubUserState)
    await screen.findByText('name')
  })
})
