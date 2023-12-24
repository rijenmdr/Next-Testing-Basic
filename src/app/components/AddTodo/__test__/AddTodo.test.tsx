import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddItemForm from '../AddTodo';

const mockSetTodos = jest.fn();

describe("TodoItem", () => {
    beforeEach(() => {
        //ARRANGE
        render(<AddItemForm setTodos={mockSetTodos} />)
    })
    describe("Render", () => {
        it("should render an input", () => {
            //ACT
            const input = screen.getByPlaceholderText("New Todo");
            //ASSERT
            expect(input).toHaveFocus();
        })

        it("should render a disabled submit button", () => {
            //ACT
            const submitBtn = screen.getByRole("button", {
                name: "Submit"
            });
            //ASSERT
            expect(submitBtn).toBeDisabled();
        })
    })

    describe("Behaviour", () => {
        it('should be able to add text to the input', async () => {
            const input = screen.getByPlaceholderText('New Todo') //ACT
            await userEvent.type(input, 'hey there')
            expect(input).toHaveValue("hey there")// ASSERT
        })

        it('should enable the submit button when text is input', async () => {
            const input = screen.getByPlaceholderText('New Todo') //ACT
            await userEvent.type(input, 'hey there')

            const button = screen.getByRole('button', {
                name: 'Submit'
            })

            expect(button).toBeEnabled() // ASSERT
        })

        it('should empty the text input when submitted', async () => {
            const input = screen.getByPlaceholderText('New Todo') //ACT
            await userEvent.type(input, 'hey there')
            const button = screen.getByRole('button', {
                name: 'Submit'
            })
            await userEvent.click(button)

            expect(input).toHaveValue("")// ASSERT
        })

        it('should call setTodos when clicking submit button', async () => {
            const input = screen.getByPlaceholderText('New Todo') //ACT
            await userEvent.type(input, 'hey there')
            const button = screen.getByRole('button', {
                name: 'Submit'
            })
            await userEvent.click(button)

            expect(mockSetTodos).toHaveBeenCalled()// ASSERT
        })

    })
})