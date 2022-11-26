import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import Filter from "./Filter";

describe("<Filter />", () => {
    it("should render without errors", async () => {
        render(<Filter category = "grades" options = { ["A", "B", "C", "D"] } handler={ (remove: string, add: string) => {} }/>);
            const dropdown_button = screen.getByText("grades");
            await waitFor(() => fireEvent.click(dropdown_button));
            await waitFor(() => fireEvent.click(screen.getByText("B")));
            expect(screen.getAllByText("B").length).toEqual(2);
            await waitFor(() => fireEvent.click(screen.getByText('grades')))
        })
});