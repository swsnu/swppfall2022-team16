import React from 'react'
import { fireEvent, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubShopItemState, stubUserOrderState, stubUserState } from "../test-utils/mock"
import PaymentPage from "./PaymentPage"
import { ShopItemState } from '../store/slices/shopitem'
import { UserState } from '../store/slices/user'

jest.mock('../components/PaymentForm', () => () => (
  <div data-testid='spyPaymentForm'></div>
))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderPaymentPage = (shopItemState: ShopItemState, userState: UserState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/payment/1']}>
      <Routes>
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path='/user/8' element={<div data-testid='spyMyPage'></div>} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState, user: userState}}
  )
}


describe('<PaymentPage />', () => {
  it('should render without error', async() => {
    renderPaymentPage(stubShopItemState, stubUserState)
    await screen.findByTestId('spyPaymentForm')
  })
  it('should handle shipping options', async() => {
    renderPaymentPage(stubShopItemState, stubUserState)
    const fastCard =  await screen.findByTestId('fast')
    const standardCard = await screen.findByTestId('standard')
    fireEvent.click(standardCard)
    fireEvent.click(fastCard)
  })
  it('should handle buy button', async() => {
    mockDispatch.mockResolvedValue({
      type: 'userorder/purchaseWithCredit/fulfilled'
    })
    renderPaymentPage(stubShopItemState, stubUserState)
    const buyButton = await screen.findByText('Buy with my credit')
    fireEvent.click(buyButton)
    //await screen.findByTestId('spyMyPage')
  })
})
