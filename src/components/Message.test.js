import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Message } from './Message'
import { AuthContext } from '../contexts/authContext'


afterEach(() => {
    cleanup()
})

test('Message renders with Right class',  () => {
    const message = {
        uid: 123,
        name: 'me',
        message: 'hi'
    }
    const authUser = {
        uid: 123
    }

    const {container} = render(
        <AuthContext.Provider value={{ authUser }}>

            <Message message={message} />
        </AuthContext.Provider>
    )
    const messages = container.getElementsByClassName('messageWrapperRight')
    expect(messages.length).toBe(1)

})

test('Message renders with Left class', () => {
    const message = {
        uid: 123,
        name: 'me',
        message: 'hi'
    }
    const authUser = {
        uid: 321
    }
    const {container} = render(
        <AuthContext.Provider value={{ authUser }}>

            <Message message={message} />
        </AuthContext.Provider>
    )
    const messages = container.getElementsByClassName('messageWrapperLeft')
    expect(messages.length).toBe(1)

})

test('Message and user to be correctly displayed', () => {
    const message = {
        uid: 123,
        name: 'me',
        message: 'hi'
    }
    const authUser = {
        uid: 321
    }
    render(
        <AuthContext.Provider value={{ authUser }}>

            <Message message={message} />
        </AuthContext.Provider>
    )
    expect(screen.getByText(message.message)).toHaveTextContent('hi')
    expect(screen.getByText(message.name)).toHaveTextContent('me')

})