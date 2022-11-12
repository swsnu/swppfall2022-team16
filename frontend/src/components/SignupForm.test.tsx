import { fireEvent, render, screen} from "@testing-library/react";
import SignupForm from './SignupForm'

describe('<SignupForm/>', ()=>{
    it("should render without errors", ()=>{
        render(<SignupForm/>);
        screen.getByPlaceholderText("Name");
        screen.getByPlaceholderText("Email Address");
        screen.getByPlaceholderText("Password");
        screen.getByPlaceholderText("Your height in cm");
        screen.getByPlaceholderText("Your weight in kg");
        const signinbutton = screen.getByRole('button');
    }),
    it("should render proper signup", ()=>{
        render(<SignupForm/>);
        const name = screen.getByPlaceholderText("Name");
        const email = screen.getByPlaceholderText("Email Address");
        const password = screen.getByPlaceholderText("Password");
        const height = screen.getByPlaceholderText("Your height in cm");
        const weight = screen.getByPlaceholderText("Your weight in kg");
        const male = screen.getByPlaceholderText("gender1");
        const female = screen.getByPlaceholderText("gender2");
        const signupButton = screen.getByText("Sign-up");
        fireEvent.click(signupButton);
        fireEvent.change(male, 'Male');
        fireEvent.change(female, 'Female');
        fireEvent.click(male);
        fireEvent.click(female);
        fireEvent.change(name, {target : {value : "Alice"}});
        fireEvent.change(email, {target : {value : "user1"}});
        fireEvent.change(password, {target : {value : "user1"}});
        fireEvent.change(height, {target : {value : "170"}});
        fireEvent.change(weight, {target : {value : "52"}});
    })
})