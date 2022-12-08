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
  it('should render without error', () => {
    renderPaymentPage(stubShopItemState, stubUserState)
    screen.getByTestId('spyPaymentForm')
  })
  it('should handle shipping options', () => {
    renderPaymentPage(stubShopItemState, stubUserState)
    const fastCard = screen.getByTestId('fast')
    const standardCard = screen.getByTestId('standard')
    fireEvent.click(standardCard)
    fireEvent.click(fastCard)
  })
  it('should handle buy button', () => {
    renderPaymentPage(stubShopItemState, stubUserState)
    const buyButton = screen.getByText('Buy with my credit')
    fireEvent.click(buyButton)
    screen.getByTestId('spyMyPage')
  })
})
