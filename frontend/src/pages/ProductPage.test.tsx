import React from 'react'
import { fireEvent, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubNoReviewState, stubReviewState, stubShopItemState, stubUserOrderState, stubUserState } from "../test-utils/mock"
import ProductPage from './ProductPage'
import { ShopItemState } from '../store/slices/shopitem'
import { ReviewState } from '../store/slices/review'
import { UserState } from '../store/slices/user'

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
  it('should render without error', () => {
    renderProductPage(stubShopItemState, stubReviewState, stubUserState)
  })
  it('should handle the case when there are no reviews', () => {
    renderProductPage(stubShopItemState, stubNoReviewState, stubUserState)
  })
})
