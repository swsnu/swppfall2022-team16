import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { renderWithProviders, stubLoginUserState, stubUserOrderState, stubUserState} from "../test-utils/mock";
import OrderDetailForm from "./OrderDetailForm";
import { UserOrderState } from "../store/slices/userorder";
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

const renderOrderDetailForm = (userState : UserState) => {
  renderWithProviders(
  <OrderDetailForm  itemID = {1}
  itemName = "BridgeUs"
  sellerName= "team16"
  colors={['White', 'Black', 'Brown']}
  rating = {4}
  quantity = {5}
  price = {100}
  recommendedSize = "M"
  />, { preloadedState: { user : userState } }
  )
}

describe("<OrderDetailForm />", () => {
  it("should render without errors", async () => {
    renderOrderDetailForm(stubLoginUserState)
    await screen.findByText('★★★★☆')
    screen.getByText('$100');
    const dropdown_button1 = screen.getByText("White");
    await waitFor(() => fireEvent.click(dropdown_button1));
    await waitFor(() => fireEvent.click(screen.getByText("Black")));
    await waitFor(() => fireEvent.click(screen.getByText("Brown")));
    const dropdown_button2 = screen.getByText("Quantity");
    await waitFor(() => fireEvent.click(dropdown_button2));
    await waitFor(() => fireEvent.click(screen.getByText("1")));
    await waitFor(() => fireEvent.click(screen.getByText("2")));
    await waitFor(() => fireEvent.click(screen.getByText("3")));
    await waitFor(() => fireEvent.click(screen.getByText("4")));
    await waitFor(() => fireEvent.click(screen.getByText("5")));
    const dropdown_button3 = screen.getByText("Size");
    await waitFor(() => fireEvent.click(dropdown_button3));
    await waitFor(() => fireEvent.click(screen.getByText("S")));
    await waitFor(() => fireEvent.click(screen.getByText("M")));
    await waitFor(() => fireEvent.click(screen.getByText("L")));
    screen.getByText("Add to Cart");
    const buyNowButton = screen.getByText("Buy Now");
    fireEvent.click(buyNowButton);
    expect(mockNavigate).toHaveBeenCalled();
  })
});