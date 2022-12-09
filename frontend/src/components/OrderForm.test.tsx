import React from 'react'
import { fireEvent, render, screen, waitFor} from "@testing-library/react"
import OrderForm from "./OrderForm"
import { renderWithProviders, stubShopItemState, stubUserOrderState, stubUserState } from '../test-utils/mock'
import { ShopItemState } from '../store/slices/shopitem'
import { UserState } from '../store/slices/user'
import { UserOrderState } from '../store/slices/userorder'

const mockNavigate = jest.fn()
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderOrderForm = (shopItemState: ShopItemState, userState: UserState, userOrderState: UserOrderState): any => {
  renderWithProviders(
    <OrderForm
      orderID={1}
      itemID={1}
      color={'Black'}
      size={'L'}
      quantity={1}
      price={100} />,
    { preloadedState: { shopitem: shopItemState, user: userState, userorder: userOrderState } }
  )
}

describe("<OrderForm />", () => {
  it("should render without errors", async () => {
    renderOrderForm(stubShopItemState, stubUserState, stubUserOrderState)
    await screen.findByAltText("itemimage")
    screen.getByAltText("itemimage")
    screen.getByText("Color")
    screen.getByText("Size")
    screen.getByText("Quantity")
    screen.getByText("Black")
    screen.getByText("L")
    screen.getByText("1")
  })
});