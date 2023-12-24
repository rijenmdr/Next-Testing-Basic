import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe("Header", () => {
    it("should render 'New Todos'", () => {
        //ARRANGE
        render(<Header title="New Todos"/>)

        //ACT
        const header = screen.getByRole("heading", {
            name: "New Todos"
        })

        //ASSERT
        expect(header).toBeInTheDocument();
    })
})