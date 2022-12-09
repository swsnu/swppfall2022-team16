import { screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { ReviewState } from "../store/slices/review"
import { ShopItemState } from "../store/slices/shopitem"
import { renderWithProviders, stubReviewState, stubShopItemState } from "../test-utils/mock"
import CommunityPage from "./CommunityPage"

const renderCommunityPage = (shopItemState: ShopItemState, reviewState: ReviewState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/community']}>
      <Routes>
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState, review: reviewState}}
  )
}

describe('<CommunityPage />', () => {
  it('should render without error', async () => {
    renderCommunityPage(stubShopItemState, stubReviewState)
    await screen.findByText('Community')
  })
})
