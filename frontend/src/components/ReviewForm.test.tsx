import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import ReviewForm from './ReviewForm'


describe('<ReviewForm/>', ()=>{
    it("should render without errors", ()=>{
        render(<ReviewForm/>);
        screen.getByPlaceholderText("Karinas outfit from LA");
        screen.getByPlaceholderText("This is amazing");
        screen.getByPlaceholderText("upload your photo");
        const rating = screen.getByText('Rank Your Outfit')
        fireEvent.click(rating);
        fireEvent.click(screen.getByText("★☆☆☆☆"));
        fireEvent.click(screen.getByText("★★☆☆☆"));
        fireEvent.click(screen.getByText("★★★☆☆"));
        fireEvent.click(screen.getByText("★★★★☆"));
        fireEvent.click(screen.getByText("★★★★★"));
        const reviewButton = screen.getByText("Post Your Review");
        fireEvent.click(reviewButton);
    })
})