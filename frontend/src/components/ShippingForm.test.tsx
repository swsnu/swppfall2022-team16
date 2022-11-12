import {render, screen} from "@testing-library/react";
import ShippingForm from './ShippingForm'

describe ( '<ShippingForm />', () => {
    it("should render without errors", async () => {
        render (<ShippingForm/>);
        screen.getByPlaceholderText("enter your road address");
        screen.getByPlaceholderText("enter the number of your building");
        screen.getByPlaceholderText("enter your state or zip code");
        screen.getByPlaceholderText("enter your country");
        screen.getByPlaceholderText("enter your city");
    })
})