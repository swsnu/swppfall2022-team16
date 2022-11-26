import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import Post from "./Post";
import { renderWithProviders, stubReviewState, stubShopItemState, stubUserState } from '../test-utils/mock';
import { UserState } from "../store/slices/user";
import { ShopItemState } from "../store/slices/shopitem";

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

const renderPost = (reviewState: ReviewState, userState: UserState, itemState: ShopItemState) => {
  renderWithProviders(
    <Post id = {1}/>, { preloadedState: { review: reviewState, user: userState, shopitem: itemState }}
  )
}


describe("<Post />", () => {
    it("should render without errors", async () => {
        mockDispatch.mockResolvedValueOnce({});
        renderPost(stubReviewState, stubUserState, stubShopItemState)
        const postImage = screen.getByAltText("postimage");
        const likeButton = screen.getByRole("button");
        screen.getByTestId("rating");
        screen.getByTestId("author");
        await waitFor (() => fireEvent.click(likeButton));
        expect(mockNavigate).not.toHaveBeenCalled();
        screen.getByText("1001")
        fireEvent.mouseOver(postImage);
        fireEvent.mouseOut(postImage);
        fireEvent.click(postImage);
        expect(mockNavigate).toHaveBeenCalled();
        })
});