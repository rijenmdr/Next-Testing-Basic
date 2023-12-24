import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import TodoItem from "../TodoItem";
import { Todo } from "@/types/Todo";

const mockTodo: Todo = {
    userId: 1,
    id: 1,
    title: "Hello World",
    completed: true
}

const mockSetTodo = jest.fn();

describe("TodoItem", () => {
    beforeEach(() => {
        //ARRANGE
        render(<TodoItem todo={mockTodo} setTodos={mockSetTodo} />)
    })
    describe("Render", () => {
        it("should render an article", () => {
            //ACT
            const article = screen.getByRole("article");
            //ASSERT
            expect(article).toBeInTheDocument();
        })

        it("should render a label", () => {
            //ACT
            const label = screen.getByTestId("todo-item");
            //ASSERT
            expect(label).toBeInTheDocument();
        })

        it("should render an checkbox", () => {
            //ACT
            const checkbox = screen.getByRole("checkbox");
            //ASSERT
            expect(checkbox).toBeInTheDocument();
        })

        it("should render an button", () => {
            //ACT
            const button = screen.getByRole("button");
            //ASSERT
            expect(button).toBeInTheDocument();
        })
    })

    describe("Behaviour", () => {
        it("should call setTodos when checkbox is clicked", async() => {
            //ACT
            const checkbox = screen.getByRole("checkbox");
            await userEvent.click(checkbox);

            //ASSERT
            expect(mockSetTodo).toHaveBeenCalled();
        })

        it("should call setTodos when button is clicked", async() => {
            //ACT
            const button = screen.getByRole("button");
            await userEvent.click(button);

            //ASSERT
            expect(mockSetTodo).toHaveBeenCalled();
        })
    })
})