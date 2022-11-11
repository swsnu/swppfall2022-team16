import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from 'react-bootstrap';
import LoginForm from "./LoginForm";

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

describe("<LoginForm />", () => {
    it("should render without errors", () => {
        render(<LoginForm/>);
        expect(screen.getAllByText('Login').length).toEqual(2);
        screen.getByPlaceholderText('Email Address');
        screen.getByPlaceholderText('Password');
        const loginbutton = screen.getByRole('button');
        fireEvent.click(loginbutton);
        expect(mockDispatch).toHaveBeenCalled();
        })
});