import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders, stubLoginUserState, stubUserState } from '../test-utils/mock'
import TopBar from './TopBar'
import { UserState } from '../store/slices/user'

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

const renderTopBar = (userState: UserState): any => {
  renderWithProviders(
    <TopBar />, { preloadedState: { user: userState } }
  )
}

describe('<TopBar/>', () => {
  it('should render without error', () => {
    renderTopBar(stubUserState)
    const title = screen.getByAltText('BridgeUs')
    const logo = screen.getByAltText('bridgeUsLogo')
    fireEvent.click(logo)
    // expect(mockNavigate).toHaveBeenCalled()
    const community = screen.getByAltText('community')
    fireEvent.click(community)
    // expect(mockNavigate).toHaveBeenCalled()
    const search = screen.getByPlaceholderText('Search')
    fireEvent.change(search, { target: { value: 'Karina' } })
    fireEvent.keyPress(search, { key: 'Enter' })
    // expect(mockNavigate).toHaveBeenCalled()
  })
  it('should handle login status', () => {
    renderTopBar(stubLoginUserState)
    const logoutButton = screen.getByText('log out')
    fireEvent.click(logoutButton)
  })
  it('should handle search', () => {
    renderTopBar(stubLoginUserState)
    const search = screen.getByPlaceholderText('Search')
    screen.debug()
    fireEvent.keyDown(search, {key: 'a'});
    fireEvent.keyDown(search, {key: 'Enter', code: 'Enter', charCode: 13})
  })
})
