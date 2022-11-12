import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import Purchased from "./Purchased";
import { renderWithProviders } from '../test-utils/mock';

describe("<Purchased />", () => {
    it("should render without errors", async () => {
        renderWithProviders(<Purchased
            itemName = "BridgeUs"
            itemPrice = {100}
            shippingStatus = ""
            purchaseDate = ""
            />);
            screen.getByAltText("itemimage");
            screen.getByText("BridgeUs");
            screen.getByText("team16");
            screen.getByText("Color");
            screen.getByText("Size");
            screen.getByText("Quantity");
            screen.getByText("Black");
            screen.getByText("L");
            screen.getByText("1");
        })
});