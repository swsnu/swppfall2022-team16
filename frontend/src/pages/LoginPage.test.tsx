import React from 'react'
import { render, screen } from "@testing-library/react"
import LoginPage from "./LoginPage"

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

describe('<LoginPage />', () => {
  it('should render without errors', () => {
    render(<LoginPage />)
    expect(screen.getAllByTestId('spySideBar')).toHaveLength(1)
    expect(screen.getAllByTestId('spyLoginForm')).toHaveLength(1)
    expect(screen.getAllByTestId('spyFooter')).toHaveLength(1)
  })
})
