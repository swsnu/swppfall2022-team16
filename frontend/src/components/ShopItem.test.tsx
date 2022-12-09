import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import ShopItem from "./ShopItem";
import { renderWithProviders, stubLoginUserState } from '../test-utils/mock';
import { UserState } from "../store/slices/user";

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

const renderShopItem = (userState: UserState): any => {
  renderWithProviders(
    <ShopItem shopItem= {{
      id: 1,
      name: "BridgeUs",
      seller: 1,
      image_url: "testURL",
      price: 100,
      rating: 4,
      star: 4,
      type: "socks",
      tags: ['a', 'b']
    }}/>,
    { preloadedState: { user: userState } }
  )
}

describe("<ShopItem />", () => {
  it("should render without errors", async () => {
    mockDispatch.mockResolvedValueOnce({});
    renderShopItem(stubLoginUserState);
    await screen.findByTestId('card-with-data')
    const postImage = await screen.findByAltText('Product Image')
    fireEvent.mouseOver(postImage);
    fireEvent.mouseOut(postImage);
    fireEvent.click(postImage)
    })
});