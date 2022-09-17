import '../App.css'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { ErrorMessage } from './ErrorMessage'
import { login } from '../services/firebase-auth'

export const LoginModal = ({showModalHandler, switchHandler}) => {
    const navigateTo = useNavigate()

    const [isFocused, setFocus] = useState({
        'email': false,
        'password': false
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const showErrorWhen = isClicked && errorMessage


    useEffect(() => {
        return () => {
            setIsClicked(true)
        }

    }, [errorMessage])

    const labelHandler = (ev) => {
        let input = ev.target
        if (input.value.trim()) {
            setFocus(oldFocus => ({ ...oldFocus, [input.name]: true }))
            return;
        }
        setFocus(oldFocus => ({ ...oldFocus, [input.name]: !isFocused[`${input.name}`] }))
    }


    async function loginHandler(ev) {
        ev.preventDefault();

        const {
            email,
            password
        } = Object.fromEntries(new FormData(ev.target))
        login(email, password)
            .then(userCred => {
                setErrorMessage('')
                navigateTo('/')
                showModalHandler()
            })
            .catch(err => {
                setErrorMessage(err.message)
            })

    }
    return (
        <>
            <div className="overlay" onClick={showModalHandler}></div>
            <div className="modal-content">
                <h3>Welcome back</h3>
                <div className="text-wrapper">
                    <span>Don't have an account?</span>
                    <Link to='/' onClick={() => switchHandler(false)}>Sign up</Link>
                </div>

                {showErrorWhen &&
                    <ErrorMessage message={errorMessage}></ErrorMessage>
                }

                <form onSubmit={loginHandler}>
                    <div className="email-wrapper">
                        <label htmlFor="email" className={isFocused.email ? "focused" : "labels"}>Email</label>
                        <input type="email" name="email" id="email" onBlur={labelHandler} onFocus={labelHandler} autoComplete='off' required />
                    </div>

                    <div className="password-wrapper">
                        <label htmlFor="password" className={isFocused.password ? "focused" : "labels"}>Password</label>
                        <input type="password" name="password" id="password" onBlur={labelHandler} onFocus={labelHandler} required />
                    </div>

                    <div className="authBtn">
                        <button>Log in</button>
                    </div>
                </form>
                <div className="modal-close">
                    <button onClick={showModalHandler}>&#x2716;</button>
                </div>
            </div>
        </>
    )
}