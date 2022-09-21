import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ErrorMessage } from './ErrorMessage'

afterEach(() => {
    cleanup()
})

test('Error Message to render properly', () => {
    const value = 'hello'

    render(

        <ErrorMessage message={value} />

    )
    expect(screen.getByText(value + '!')).toHaveTextContent(value)

})