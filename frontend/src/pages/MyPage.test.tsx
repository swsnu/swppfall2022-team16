import { screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { CommentState } from "../store/slices/comment"
import { UserState } from "../store/slices/user"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubCommentState, stubUserOrderState, stubUserState } from "../test-utils/mock"
import MyPage from "./MyPage"

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderMyPage = (userOrderState: UserOrderState, commentState: CommentState, userState: UserState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/user/1']}>
      <Routes>
        <Route path="/user/:id" element={<MyPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: { userorder: userOrderState, comment: commentState, user: userState } }
  )
}

describe('<MyPage />', () => {
  it('should render without error', async () => {
    renderMyPage(stubUserOrderState, stubCommentState, stubUserState)
    await screen.findByText('Purchased')
  })
})
