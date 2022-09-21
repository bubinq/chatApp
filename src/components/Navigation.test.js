import { cleanup, waitFor, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navigation } from './Navigation'
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext'


afterEach(() => {
    cleanup()
})

jest.spyOn(window, 'confirm');


test('Create Form should show onClick', async () => {
    const authUser = {
        name: 'Pesho',
        age: 21
    }
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ authUser }}>
                <Navigation />
            </AuthContext.Provider>
        </BrowserRouter>
    )
    const createBtn = screen.getByRole('button')
    fireEvent.click(createBtn)
    await waitFor(() => {
        expect(screen.getByText('Create ChatRoom')).toBeInTheDocument()
    })
})

test('Create room button should not show on logged out user', async () => {
    const authUser = undefined
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ authUser }}>
                <Navigation />
            </AuthContext.Provider>
        </BrowserRouter>
    )
    expect(screen.getByTestId('login')).toHaveTextContent('Log In')
})

test('Log out should be working correctly', async () => {
    const authUser = {
        email: 'pesho@abv.bg'
    }
    const alert = jest.spyOn(window, 'confirm')
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ authUser }}>
                <Navigation />
            </AuthContext.Provider>
        </BrowserRouter>
    )
    const logOutBtn = screen.getByTestId('logout')
    fireEvent.click(logOutBtn)
    await waitFor(() => {
        expect(alert).toHaveBeenCalledTimes(1);
    })
})


test('Display correct welcome message when auth user is present', () => {
    const authUser = {
        email: 'pesho@abv.bg',
        age: 21
    }
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ authUser }}>
                <Navigation />
            </AuthContext.Provider>
        </BrowserRouter>
    )
    const welcomeMSg = screen.getByRole('heading')
    expect(welcomeMSg).toHaveTextContent('Welcome, pesho@abv.bg')
})