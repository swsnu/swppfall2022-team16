import { fireEvent, render, screen } from "@testing-library/react";
import CommunityAlert from "./CommunityAlert";

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

describe("<Community Alert />", () => {
    it("should render without errors", () => {
        render(<CommunityAlert newCommentAuthor = "team16" 
        newCommentedPostId = {1}
        newCommentPostedTime = {new Date()}
        />);
        const stackLink = screen.getByText("team16 commented on your post");
        fireEvent.click(stackLink);
        expect(mockNavigate).toHaveBeenCalled();
        screen.getByText("0 days ago");
        })
});