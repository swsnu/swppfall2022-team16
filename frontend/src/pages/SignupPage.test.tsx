import React from 'react'
import { render, screen } from "@testing-library/react"
import { renderWithProviders } from '../test-utils/mock'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './SignupPage'

jest.mock('../components/SideBar', () => () => (
  <div data-testid='spySideBar'></div>
))

jest.mock('../components/SignupForm', () => () => (
  <div data-testid='spySignupForm'></div>
))

jest.mock('../components/Footer', () => () => (
  <div data-testid='spyFooter'></div>
))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

const renderSignupPage = () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('<SignupPage />', () => {
  it('should render without errors', () => {
    renderSignupPage()
    expect(screen.getAllByTestId('spySideBar')).toHaveLength(1)
    expect(screen.getAllByTestId('spySignupForm')).toHaveLength(1)
    expect(screen.getAllByTestId('spyFooter')).toHaveLength(1)
  })
})
