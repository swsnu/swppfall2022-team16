import { MemoryRouter, Route, Routes } from "react-router-dom"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubUserOrderState } from "../test-utils/mock"
import MyPage from "./MyPage"

const renderMyPage = (userOrderState: UserOrderState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/user/1']}>
      <Routes>
        <Route path="/user/:id" element={<MyPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {userorder: userOrderState}}
  )
}

describe('<MyPage />', () => {
  it('should render without error', () => {
    renderMyPage(stubUserOrderState)
  })
})
