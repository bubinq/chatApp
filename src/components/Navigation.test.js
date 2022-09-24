import { cleanup, waitFor, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navigation } from './Navigation'
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext'
import { RoomContext } from '../contexts/roomContext';


afterEach(() => {
    cleanup()
})

jest.spyOn(window, 'confirm');


test('Create Form should show onClick', async () => {
    const authUser = {
        name: 'Pesho',
        age: 21
    }
    const chatRooms = [
        {
            name: 'Pesho',
            isPrivate: false,
            password: ''
        },
        {
            name: 'Gosho',
            isPrivate: false,
            password: ''
        }
    ]
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ authUser }}>
                <RoomContext.Provider value={{ chatRooms }}>
                    <Navigation />
                </RoomContext.Provider>
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
    const chatRooms = [
        {
            name: 'Pesho',
            isPrivate: false,
            password: ''
        },
        {
            name: 'Gosho',
            isPrivate: false,
            password: ''
        }
    ]
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ authUser }}>
                <RoomContext.Provider value={{ chatRooms }}>
                    <Navigation />
                </RoomContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
    expect(screen.getByTestId('login')).toHaveTextContent('Log In')
})

test('Log out should be working correctly', async () => {
    const authUser = {
        email: 'pesho@abv.bg'
    }
    const chatRooms = [
        {
            name: 'Pesho',
            isPrivate: false,
            password: ''
        },
        {
            name: 'Gosho',
            isPrivate: false,
            password: ''
        }
    ]
    const alert = jest.spyOn(window, 'confirm')
    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ authUser }}>
                <RoomContext.Provider value={{ chatRooms }}>
                    <Navigation />
                </RoomContext.Provider>
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
    const chatRooms = [
        {
            name: 'Pesho',
            isPrivate: false,
            password: ''
        },
        {
            name: 'Gosho',
            isPrivate: false,
            password: ''
        }
    ]

    render(
        <BrowserRouter>
            <AuthContext.Provider value={{ authUser }}>
                <RoomContext.Provider value={{ chatRooms }}>
                    <Navigation />
                </RoomContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
    const welcomeMSg = screen.getByRole('heading')
    expect(welcomeMSg).toHaveTextContent('Welcome, pesho@abv.bg')
})