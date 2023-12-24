import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";

describe("Home", () => {
    beforeEach(() => {
        render(<Home />)
    });

    it("should add new todo", async() => {
        const input = screen.getByPlaceholderText("New Todo");
        await userEvent.type(input, "Coding All Day");
        expect(input).toHaveValue("Coding All Day");

        const button = screen.getByRole("button", {
            name: "Submit"
        });
        await userEvent.click(button);
        expect(input).toHaveValue("");

        const data = await screen.findByText("Coding All Day");
        expect(data).toBeInTheDocument();
    });

    it("should edit the todos", async() => {
        const checkbox = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
        expect(checkbox.checked).toBeFalsy()
        await userEvent.click(checkbox);
        expect(checkbox.checked).toBeTruthy;
    });

    it("should delete the todo", async() => {
        const todoText = screen.queryByText("Write Code 💻");
        expect(todoText).toBeInTheDocument();

        const deleteBtn = screen.getAllByTestId("delete-button")[0];
        await userEvent.click(deleteBtn);

        expect(todoText).not.toBeInTheDocument();
    });
})