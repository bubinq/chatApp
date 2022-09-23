import { useState } from "react"
import { useNavigate } from "react-router"
import styles from './PassPopUp.module.css'

export const PassPopUp = ({ chatRoom, togglePopUp, id }) => {

    const [passValue, setPassValue] = useState('')

    const navigateTo = useNavigate()

    const checkPasswords = (ev) => {
        ev.preventDefault()
        const currRoom = chatRoom.filter(room => room.id === id)
        if (currRoom[0].password === passValue) {
            navigateTo(`/chatroom/${currRoom[0].id}`)
        } else {
            alert('Wrong Password')
        }
    }

    return (
        <>
            <div className="overlay" onClick={togglePopUp} data-testid='overlay'></div>
            <div className="modal-content">
                <h1 className={styles.heading}>Type Room Password</h1>
                <form onSubmit={checkPasswords}>
                    <div className="password-wrapper">
                        <label htmlFor="password" className={styles.labels}>Password</label>
                        <input type="password" name="password" id="password" required onChange={(ev) => { setPassValue(ev.target.value) }} />
                    </div>

                    <div className="authBtn">
                        <button data-testid='submit'>Confirm</button>
                    </div>
                    <div className="modal-close">
                        <button onClick={togglePopUp} data-testid='close'>&#x2716;</button>
                    </div>
                </form>
            </div>
        </>

    )
}