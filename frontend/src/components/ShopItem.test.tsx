import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import ShopItem from "./ShopItem";
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
        renderWithProviders(<ShopItem shopItem= {{
            id: 1,
            name: "BridgeUs",
            seller: 1,
            image_url: "testURL",
            price: 100,
            rating: 4,
            star: 4,
            type: "socks"
        }}/>);
        const postImage = screen.getByAltText("Product Image");
        fireEvent.mouseOver(postImage);
        fireEvent.mouseOut(postImage);
        screen.getByTestId("test");
        })
});