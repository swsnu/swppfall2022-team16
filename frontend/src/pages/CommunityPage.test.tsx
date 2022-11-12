import { MemoryRouter, Route, Routes } from "react-router-dom"
import { ShopItemState } from "../store/slices/shopitem"
import { renderWithProviders, stubShopItemState } from "../test-utils/mock"
import CommunityPage from "./CommunityPage"

const renderCommunityPage = (shopItemState: ShopItemState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/community']}>
      <Routes>
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState}}
  )
}

describe('<CommunityPage />', () => {
  it('should render without error', () => {
    renderCommunityPage(stubShopItemState)
  })
})
