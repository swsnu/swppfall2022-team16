import React from 'react'
import { render, screen } from "@testing-library/react"
import LoginPage from "./LoginPage"
import { renderWithProviders } from '../test-utils/mock'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

jest.mock('../components/SideBar', () => () => (
  <div data-testid='spySideBar'></div>
))

jest.mock('../components/LoginForm', () => () => (
  <div data-testid='spyLoginForm'></div>
))

jest.mock('../components/Footer', () => () => (
  <div data-testid='spyFooter'></div>
))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderLoginPage = () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('<LoginPage />', () => {
  it('should render without errors', () => {
    renderLoginPage()
    expect(screen.getAllByTestId('spySideBar')).toHaveLength(1)
    expect(screen.getAllByTestId('spyLoginForm')).toHaveLength(1)
    expect(screen.getAllByTestId('spyFooter')).toHaveLength(1)
  })
})
