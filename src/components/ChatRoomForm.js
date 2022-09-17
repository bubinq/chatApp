import { useState } from "react"
import { addDoc } from "firebase/firestore"
import { chatRoomRef } from "./constants/FirebaseConstants"


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
    }

    return (
        <>
            <div className="overlay" onClick={toggleCreateForm}></div>
            <div className="modal-content">
                <h3>Create ChatRoom</h3>
                <form onSubmit={createRoom}>
                    <div className="email-wrapper">
                        <label htmlFor="name" className="labels">ChatRoom</label>
                        <input type="text" name="chat" id="name" autoComplete='off' value={formValue.name} onChange={(ev) => { setFormValue(oldVal => ({ ...oldVal, name: ev.target.value })) }} required />
                    </div>

                    <div className="email-wrapper">
                        <label htmlFor="pas">Make room private</label>
                        <input type="checkbox" id="pas" onClick={showPassHandler} onChange={() => { setFormValue(oldVal => ({ ...oldVal, isPrivate: !oldVal['isPrivate'] })) }} ></input>
                    </div>

                    {show &&
                        <div className="password-wrapper">
                            <label htmlFor="password" className="labels">Password</label>
                            <input type="password" name="password" id="password" required onChange={(ev) => { setFormValue(oldVal => ({ ...oldVal, password: ev.target.value })) }} />
                        </div>
                    }

                    <div className="authBtn">
                        <button>Create</button>
                    </div>
                </form>
                <div className="modal-close">
                    <button onClick={toggleCreateForm}>&#x2716;</button>
                </div>
            </div>
        </>
    )
}