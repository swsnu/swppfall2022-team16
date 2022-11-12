import { fireEvent, render, screen} from "@testing-library/react";
import { UserState } from "../store/slices/user";
import { renderWithProviders } from '../test-utils/mock';
import TopBar from "./TopBar";


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

describe('<TopBar/>', ()=>{
    it("should render without error", ()=>{
        renderWithProviders(<TopBar/>);
        const logo = screen.getByText('BridgeUs')
        fireEvent.click(logo)
        expect(mockNavigate).toBeCalled
        const community = screen.getByText('community')
        fireEvent.click(community)
        expect(mockNavigate).toBeCalled
        const search = screen.getByPlaceholderText("Search")
        fireEvent.change(search, { target: { value: 'Karina' } })
        fireEvent.keyPress(search, { key : "Enter"})
        expect(mockNavigate).toBeCalled
    })
})