import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("<Banner />", () => {
    it("should render without errors", () => {
        render(<Footer/>);
        screen.getByText("BridgeUs Inc.");
        screen.getByText('about');
        screen.getByText('contact');
        screen.getByText('FAQ');
        })
});