import React from 'react'
import { fireEvent, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubUserOrderState } from "../test-utils/mock"
import PaymentPage from "./PaymentPage"

const renderPaymentPage = (userOrderState: UserOrderState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/payment/1']}>
      <Routes>
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path='/user/8' element={<div data-testid='spyMyPage'></div>} />
      </Routes>
    </MemoryRouter>, { preloadedState: {userorder: userOrderState}}
  )
}

describe('<PaymentPage />', () => {
  it('should render without error', () => {
    renderPaymentPage(stubUserOrderState)
  })
  it('should handle shipping options', () => {
    renderPaymentPage(stubUserOrderState)
    const fastCard = screen.getByTestId('fast')
    const standardCard = screen.getByTestId('standard')
    fireEvent.click(standardCard)
    fireEvent.click(fastCard)
  })
  it('should handle buy button', () => {
    renderPaymentPage(stubUserOrderState)
    const buyButton = screen.getByText('Buy with my credit')
    fireEvent.click(buyButton)
    screen.getByTestId('spyMyPage')
  })
})
