import { useState } from "react"
import { addDoc } from "firebase/firestore"
import { chatRoomRef } from "./constants/FirebaseConstants"
import styles from './ChatRoomForm.module.css'


export const ChatRoomForm = ({ toggleCreateForm }) => {
    const [show, setShow] = useState(false)
    const [formValue, setFormValue] = useState({
        name: '',
        isPrivate: false,
        password: ''
    })

    const showPassHandler = () => {
        setShow(!show)
    }

    const createRoom = async (ev) => {
        ev.preventDefault()
        await addDoc(chatRoomRef, {
            name: formValue.name,
            isPrivate: formValue.isPrivate,
            password: formValue.password
        })
        toggleCreateForm()
    }

    return (
        <>
            <div className="overlay" onClick={toggleCreateForm} data-testid='overlay'></div>
            <div className="modal-content">
                <h3>Create ChatRoom</h3>
                <form onSubmit={createRoom}>
                    <div className="email-wrapper">
                        <label htmlFor="name" className={styles.labels}>ChatRoom</label>
                        <input type="text" name="chat" id="name" autoComplete='off' value={formValue.name} onChange={(ev) => { setFormValue(oldVal => ({ ...oldVal, name: ev.target.value })) }} required data-testid='room' />
                    </div>

                    <div className={styles.makePrivate}>
                        <label htmlFor="pas">Make room private</label>
                        <input className={styles.checkBox} type="checkbox" id="pas" onClick={showPassHandler} onChange={() => { setFormValue(oldVal => ({ ...oldVal, isPrivate: !oldVal['isPrivate'] })) }} data-testid='pass'></input>
                    </div>

                    {show &&
                        <div className="password-wrapper">
                            <label htmlFor="password" className={styles.labels}>Password</label>
                            <input type="password" name="password" id="password" required onChange={(ev) => { setFormValue(oldVal => ({ ...oldVal, password: ev.target.value })) }} />
                        </div>
                    }

                    <div className="authBtn">
                        <button data-testid='submit'>Create</button>
                    </div>
                </form>
                <div className="modal-close">
                    <button onClick={toggleCreateForm} data-testid='close'>&#x2716;</button>
                </div>
            </div>
        </>
    )
}