import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import Post from "./Post";
import { renderWithProviders, stubReviewState, stubShopItemState, stubUserState } from '../test-utils/mock';
import { ReviewState } from '../store/slices/review'
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
        const postImage = await screen.findByAltText("postimage");
        const likeButton = await screen.findByRole("button");
        await screen.findByTestId("rating");
        await screen.findByTestId("author");
        await waitFor (() => fireEvent.click(likeButton));
        expect(mockNavigate).not.toHaveBeenCalled();
        await waitFor (() => fireEvent.mouseOver(postImage));
        await waitFor (() =>fireEvent.mouseOut(postImage));
        await waitFor (() =>fireEvent.click(postImage));
        expect(mockNavigate).toHaveBeenCalled();
        })
});