import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { ReviewState } from "../store/slices/review"
import shopitem, { ShopItemState } from "../store/slices/shopitem"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubReviewState, stubShopItemState, stubUserOrderState } from "../test-utils/mock"
import MainPage from "./MainPage"

const renderMainPage = (shopItemState: ShopItemState, reviewState: ReviewState ) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState, review: reviewState}}
  )
}

describe('<MyPage />', () => {
  it('should render without error', async () => {
    renderMainPage(stubShopItemState, stubReviewState)
    await screen.findByText('Trending')
  })
})
