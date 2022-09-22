import { screen, cleanup, render, fireEvent, waitFor } from '@testing-library/react'
import { ChatRoomForm } from './ChatRoomForm'
import { HomePage } from './HomePage'
import '@testing-library/jest-dom'


afterEach(() => {
    cleanup()
})


test('Create Form should dissapear after overlay is clicked', async () => {
    const toggler = {
        trigger: false,
        toggleCreateForm: () => { toggler.trigger = true }
    }

    render(<ChatRoomForm toggleCreateForm={toggler.toggleCreateForm}></ChatRoomForm>)
    jest.spyOn(toggler, 'toggleCreateForm')
    const overlay = screen.getByTestId('close')
    fireEvent.click(overlay)
    await waitFor(() => {
        expect(toggler.trigger).toBe(true)
    })
})

test('Password field should appear after checkbox is marked', async () => {
    const toggler = {
        trigger: false,
        toggleCreateForm: () => { !toggler.trigger }
    }

    render(<ChatRoomForm toggleCreateForm={toggler.toggleCreateForm}></ChatRoomForm>)
    jest.spyOn(toggler, 'toggleCreateForm')
    const overlay = screen.getByTestId('pass')
    fireEvent.click(overlay)
    await waitFor(() => {
        expect(screen.getByText('Password')).toBeInTheDocument()
    })
})

test('Create Room field should change', async () => {
    const toggler = {
        trigger: false,
        toggleCreateForm: () => { !toggler.trigger }
    }
    const testvalue = '123'

    render(<ChatRoomForm toggleCreateForm={toggler.toggleCreateForm}></ChatRoomForm>)
    const overlay = screen.getByTestId('room')
    fireEvent.change(overlay, { target: { value: testvalue } })
    await waitFor(() => {
        expect(overlay.value).toBe(testvalue)
    })
})

test('Submit event should fire after create btn is pressed', async () => {
    const toggler = {
        trigger: false,
        toggleCreateForm: () => { toggler.trigger = true },
    }

    const testvalue = 'aloha'

    render(<ChatRoomForm toggleCreateForm={toggler.toggleCreateForm}></ChatRoomForm>)
    const room = screen.getByTestId('room')
    const submitBtn = screen.getByTestId('submit')
    fireEvent.change(room, { target: { value: testvalue } })
    fireEvent.click(submitBtn)
    await waitFor(() => {
        expect(toggler.trigger).toBe(true)
    })
})