import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import Post from "./Post";
import { renderWithProviders } from '../test-utils/mock';

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("<Post />", () => {
    it("should render without errors", async () => {
        mockDispatch.mockResolvedValueOnce({});
        renderWithProviders(<Post id = {1}/>);
        const postImage = screen.getByAltText("postimage");
        const likeButton = screen.getByRole("button");
        screen.getByTestId("test");
        await waitFor (() => fireEvent.click(likeButton));
        screen.getByText("1001")
        fireEvent.mouseOver(postImage);
        fireEvent.mouseOut(postImage);
        fireEvent.click(postImage);
        expect(mockNavigate).toHaveBeenCalled();
        })
});