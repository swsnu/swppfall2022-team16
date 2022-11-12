import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { UserState } from '../store/slices/user'
import LoginForm from './LoginForm'
import { getMockStore } from '../test-utils/mock'

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

const stubInitialUserState: UserState = {
  users: [{
    id: 1,
    username: 'user1',
    nickname: 'user1',
    height: 177,
    weight: 64,
    gender: 'M'
  }],
  currentLoggedIn: null
}

describe('<LoginForm />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render without errors', () => {
    mockDispatch.mockResolvedValueOnce({
      type: 'user/login/fulfilled'
    })
    render(<LoginForm />)
    expect(screen.getAllByText('Login').length).toEqual(2)
    screen.getByPlaceholderText('Email Address')
    screen.getByPlaceholderText('Password')
    const loginbutton = screen.getByRole('button')
    fireEvent.click(loginbutton)
    expect(mockDispatch).toHaveBeenCalled()
  })
  it('should render proper login', () => {
    // const checkLogin = getMockStore()
    mockDispatch.mockResolvedValueOnce({
      type: 'user/login/fulfilled'
    })
    render(<LoginForm />)
    const emailInput = screen.getByPlaceholderText('Email Address')
    const pwInput = screen.getByPlaceholderText('Password')
    fireEvent.change(emailInput, { target: { value: 'user1' } })
    fireEvent.change(pwInput, { target: { value: 'user1' } })
    const loginbutton = screen.getByRole('button')
    fireEvent.click(loginbutton)
    expect(mockDispatch).toHaveBeenCalled()
    // expect(mockNavigate).toHaveBeenCalled()
  })
  it('should handle failed login', () => {
    mockDispatch.mockResolvedValueOnce({
      type: 'user/login/rejected'
    })
    render(<LoginForm />)
    const emailInput = screen.getByPlaceholderText('Email Address')
    const pwInput = screen.getByPlaceholderText('Password')
    fireEvent.change(emailInput, { target: { value: 'user1' } })
    fireEvent.change(pwInput, { target: { value: 'user1' } })
    const loginbutton = screen.getByRole('button')
    fireEvent.click(loginbutton)
    expect(mockDispatch).toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
