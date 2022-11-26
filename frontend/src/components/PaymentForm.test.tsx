import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import PaymentForm from "./PaymentForm";
import { renderWithProviders, stubUserShopState } from '../test-utils/mock';
import { UserShopState } from "../store/slices/usershop";

const renderPaymentForm = (userShopState: UserShopState) => {
  renderWithProviders(
    <PaymentForm shippingFee={10} totalCost = {190} credit = {300} />, { preloadedState: {usershop: userShopState}}
  )
}

describe("<PaymentForm />", () => {
  it("should render without errors", async () => {
    renderPaymentForm(stubUserShopState)
    screen.getByText("Your credits");
    screen.getByText("$300.00");
    screen.getByText("Subtotal");
    screen.getByText("$190.00");
    screen.getByText("Shipping Fee");
    screen.getByText("$10.00");
    screen.getByText("Total");
    screen.getByText("$200.00");
    screen.getByText("Remaining Credits");
    screen.getByText("$100.00");
  })
});