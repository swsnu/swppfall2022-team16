import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import PaymentForm from "./PaymentForm";
import { renderWithProviders } from '../test-utils/mock';

describe("<Filter />", () => {
    it("should render without errors", async () => {
        renderWithProviders(<PaymentForm
            shippingFee={10}
        />);
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