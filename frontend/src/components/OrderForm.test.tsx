import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import OrderForm from "./OrderForm";

describe("<Filter />", () => {
    it("should render without errors", async () => {
        render(<OrderForm
            imageURL = "testURL"
            itemName = "BridgeUs"
            sellerName = "team16"
            color = "Black"
            size = "L"
            quantity = {1}/>
            );
            screen.getByAltText("itemimage");
            screen.getByText("BridgeUs");
            screen.getByText("Team16");
            screen.getByText("Color");
            screen.getByText("Size");
            screen.getByText("Quantity");
            screen.getByText("Black");
            screen.getByText("L");
            screen.getByText("1");
        })
});