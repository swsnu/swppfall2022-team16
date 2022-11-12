import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import Purchased from "./Purchased";
import { renderWithProviders } from '../test-utils/mock';
import { Route, Routes } from 'react-router-dom';

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


describe("<Purchased />", () => {
    it("should render without errors", () => {
        renderWithProviders(
            <Purchased order = {{
            id: 1,
            user_id: 1,
            item_id: 1,
            status: "shipping"
        }}/>);

        screen.getByText("shipping");
        const reviewButton = screen.getByText("Write your Review");
        fireEvent.click(reviewButton);
        expect(mockNavigate).toHaveBeenCalled();
    })
});