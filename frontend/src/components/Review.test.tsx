import React from 'react'
import { fireEvent, render, screen, waitFor} from '@testing-library/react'
import { renderWithProviders, stubReviewState } from '../test-utils/mock'
import Review from './Review'

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

describe('<Review />', () => {
  it('should render without errors', async () => {
    mockDispatch.mockResolvedValueOnce({})
    renderWithProviders(<Review review={stubReviewState.reviews[0]} />)
    const reviewImage = screen.getByAltText('review image')
    expect(mockNavigate).not.toHaveBeenCalled()
    fireEvent.mouseOver(reviewImage)
    fireEvent.mouseOut(reviewImage)
    fireEvent.click(reviewImage)
    expect(mockNavigate).toHaveBeenCalled()
  })
})