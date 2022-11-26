import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { ReviewState } from "../store/slices/review";
import { renderWithProviders, stubReviewState } from "../test-utils/mock";
import ReviewForm from './ReviewForm'

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const renderReviewForm = (reviewState: ReviewState): any => {
  renderWithProviders(
    <ReviewForm shopItemId={1} />, { preloadedState: { review: reviewState } }
  )
}
describe('<ReviewForm/>', () => {
  it('should render without errors', () => {
    mockDispatch.mockResolvedValueOnce({
      type: 'revew/postReview/fulfilled',
      payload: stubReviewState.reviews[0]
    })
    renderReviewForm(stubReviewState)
    screen.getByPlaceholderText('Karinas outfit from LA')
    screen.getByPlaceholderText('This is amazing')
    screen.getByPlaceholderText('upload your photo')
    const reviewButton = screen.getByText('Post Your Review')
    fireEvent.click(reviewButton)
  })
  it('should post new review', () => {
    mockDispatch.mockResolvedValueOnce({
      type: 'revew/postReview/fulfilled',
      payload: stubReviewState.reviews[0]
    })
    const file = new File([new Blob([""])], 'f.jpg')
    renderReviewForm(stubReviewState)
    fireEvent.change(screen.getByPlaceholderText('Karinas outfit from LA'), { target: { value: 'title' } })
    fireEvent.change(screen.getByPlaceholderText('This is amazing'), { target: { value: 'description' } })
    fireEvent.change(screen.getByPlaceholderText('upload your photo'), { target: { files: [file]}})
    const reviewButton = screen.getByText('Post Your Review')
    fireEvent.click(reviewButton)
  })
  it('should handle selecting rating', () => {
    mockDispatch.mockResolvedValueOnce({
      type: 'revew/postReview/fulfilled',
      payload: stubReviewState.reviews[0]
    })
    renderReviewForm(stubReviewState)
    fireEvent.mouseOver(screen.getByTestId(1))
    fireEvent.mouseOver(screen.getByTestId(2))
    fireEvent.mouseOver(screen.getByTestId(3))
    fireEvent.mouseOver(screen.getByTestId(4))
    fireEvent.mouseOver(screen.getByTestId(5))
  })
})