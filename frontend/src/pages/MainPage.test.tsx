import { MemoryRouter, Route, Routes } from "react-router-dom"
import shopitem, { ShopItemState } from "../store/slices/shopitem"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubShopItemState, stubUserOrderState } from "../test-utils/mock"
import MainPage from "./MainPage"

const renderMainPage = (shopItemState: ShopItemState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState}}
  )
}

describe('<MyPage />', () => {
  it('should render without error', () => {
    renderMainPage(stubShopItemState)
  })
})
