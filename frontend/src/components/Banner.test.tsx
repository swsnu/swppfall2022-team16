import { render, screen } from "@testing-library/react";
import Banner from "./Banner";

describe("<Banner />", () => {
    it("should render without errors", () => {
        render(<Banner/>);
        expect(screen.getAllByText('SHOP NOW').length).toEqual(3)
        screen.getByAltText('First slide');
        screen.getByAltText('Second slide');
        screen.getByAltText('Third slide');
        })
});