import React from 'react'
import { fireEvent, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { UserOrderState } from "../store/slices/userorder"
import { renderWithProviders, stubShopItemState } from "../test-utils/mock"
import SearchPage from './SearchPage'
import { ShopItemInfo, ShopItemState } from '../store/slices/shopitem'

jest.mock('../components/TopBar', () => () => (
  <div data-testid='spyTopBar'></div>
))

jest.mock('../components/ShopItem', () => (props: { shopItem: ShopItemInfo }) => (
  <div data-testid='spyShopItem'></div>
))

jest.mock('../components/Footer', () => () => (
  <div data-testid='spyFooter'></div>
))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderSearchPage = (shopItemState: ShopItemState) => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/search/text']}>
      <Routes>
        <Route path="/search/:text" element={<SearchPage />} />
      </Routes>
    </MemoryRouter>, { preloadedState: {shopitem: shopItemState}}
  )
}

describe('<SearchPage />', () => {
  it('should render without error', async () => {
    renderSearchPage(stubShopItemState)
    await screen.findByText('Top Results')
    const showMoreButton = await screen.findByText('Show More')
    fireEvent.click(showMoreButton)
  })
})
