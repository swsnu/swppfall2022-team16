import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";
import SignupForm from './SignupForm'


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}))

describe('<SignupForm/>', ()=>{
    beforeEach(() => {
        jest.clearAllMocks()
      })
    it("should render without errors", ()=>{
        mockDispatch.mockResolvedValueOnce({
            type: 'user/signup/fulfilled'
          })
        render(<SignupForm/>);
        screen.getByPlaceholderText("Name");
        screen.getByPlaceholderText("Email Address");
        screen.getByPlaceholderText("Password");
        screen.getByPlaceholderText("Your height in cm");
        screen.getByPlaceholderText("Your weight in kg");
        const signinbutton = screen.getByRole('button');
    }),
    it("should render proper signup", async()=>{
        mockDispatch.mockResolvedValueOnce({
            type: 'user/signup/fulfilled'
          })
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
        fireEvent.change(email, {target : {value : "user1@gmail.com"}});
        fireEvent.change(password, {target : {value : "user1"}});
        fireEvent.change(height, {target : {value : "170"}});
        fireEvent.change(weight, {target : {value : "52"}});
        const submitButton = screen.getByRole('button')
        await waitFor(()=> fireEvent.click(submitButton))
        expect(mockNavigate).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled()
    }),
    it("should render proper checked signup", ()=>{
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
        fireEvent.change(name, {target : {value : "alice"}});
        fireEvent.change(email, {target : {value : "user1"}});
        fireEvent.change(password, {target : {value : "user1"}});
        fireEvent.change(height, {target : {value : "170"}});
        fireEvent.change(weight, {target : {value : "52"}});
    })

})