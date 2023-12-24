import { render, screen } from "@testing-library/react";

import TodoList from "../TodoList";
import { Todo } from "@/types/Todo";

const mockTodos: Todo[] = [
    {
        userId: 1,
        id: 1,
        title: "Hello World",
        completed: true
    },
    {
        userId: 1,
        id: 2,
        title: "Hello JS",
        completed: true
    }
]

const mockSetTodo = jest.fn();

describe("TodoList", () => {
    describe("when todos are empty", () => {
        it("should render 'No Todos Available'", () => {
            //ARRANGE
            render(<TodoList todos={[]} setTodos={mockSetTodo} />)

            //ACT
            const content = screen.getByText("No Todos Available");
            //ASSERT
            expect(content).toBeInTheDocument();
        })
    })

    describe("when there are todos", () => {
        beforeEach(() => {
            //ARRANGE
            render(<TodoList todos={mockTodos} setTodos={mockSetTodo} />)
        });

        it("should render a list of todos with correct no of todos", () => {
            //ACT
            const todosArray = screen.getAllByRole("article");
            //ASSERT
            expect(todosArray.length).toBe(2);
        })

        it("should render a list of todos in sorted order", () => {
            //ACT
            const firstTodo = screen.getAllByTestId("todo-item")[0];
            //ASSERT
            expect(firstTodo).toHaveTextContent("Hello JS");
        })
    })
})