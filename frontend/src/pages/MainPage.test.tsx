import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { ReviewState } from "../store/slices/review"
import shopitem, { ShopItemState } from "../store/slices/shopitem"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubReviewState, stubShopItemState, stubUserOrderState } from "../test-utils/mock"
import MainPage from "./MainPage"

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const renderMainPage = (shopItemState: ShopItemState, reviewState: ReviewState ) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState, review: reviewState}}
  )
}

describe('<MainPage />', () => {
  it('should render without error', async () => {
    renderMainPage(stubShopItemState, stubReviewState)
    await screen.findByText('Trending')
    const applyFilterButton = await screen.findByTestId('apply-filter')
    fireEvent.click(applyFilterButton)
    const showMoreButton = await screen.findByTestId('show-more')
    fireEvent.click(showMoreButton)
  })
})
