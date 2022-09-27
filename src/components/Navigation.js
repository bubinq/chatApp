import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { LoginModal } from './LoginModal'
import { RegisterModal } from './RegisterModal'
import { logout } from '../services/firebase-auth'
import { useNavigate } from 'react-router-dom'
import { ChatRoomForm } from './ChatRoomForm'
import { RoomContext } from '../contexts/roomContext'

export const Navigation = () => {
    const navigateTo = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))
    const { chatRooms } = useContext(RoomContext)

    const [toggleModal, setToggleModal] = useState(false)
    const [View, setView] = useState(() => LoginModal)
    const [create, setShowCreate] = useState(false)
    const [room, setRoom] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const path = window.location.pathname.split('/').reverse()[0]
        if (path !== '') {
            const currentRoom = chatRooms.filter(room => room.id === path)
            setRoom(currentRoom)
        }
        setIsLoading(false)
        // eslint-disable-next-line
    }, [])

    const toggleModalHandler = () => {
        setToggleModal(!toggleModal)
    }

    const toggleCreateForm = () => {
        setShowCreate(!create)
    }

    const switchFormHandler = (isLogin) => {
        if (isLogin) {
            setView(() => LoginModal)
        } else {
            setView(() => RegisterModal)
        }
    }

    const logoutHandler = (ev) => {
        ev.preventDefault()

        if (window.confirm('Are you sure you want to logout?')) {
            logout()
                .then((res) => {
                    navigateTo('/')
                    localStorage.clear()

                })
                .catch(err => [
                    alert(err.message)
                ])
        }
    }
    return (
        <div className={styles.headerWrapper}>
            <header className={styles.header}>
                {user ?
                    <div className={styles.headerSubclass}>
                        <div className={styles.createChatRoom}>
                            <div className={styles.tooltip}>
                                <button className={styles.createBtn} onClick={toggleCreateForm} data-testid='createBtn'></button>
                                <span className={styles.tooltiptext}>Create Room</span>
                            </div>
                        </div>
                        <div className={styles.currRoom}>
                            {isLoading ?
                                <h5 className={styles.currRoom}>...Loading</h5>
                                :
                                <h5 className={styles.currRoom}>{room[0]?.name}</h5>
                                // <h5 className={styles.currRoom}>WTF</h5>
                            }
                        </div>
                        <div className={styles.profileSection}>
                            <h3 className={styles.welcomeMsg}>Welcome, {user.email}</h3>
                            <Link to='/' className={styles.logOut}>Home</Link>
                            <Link to='' onClick={logoutHandler} className={styles.logOut} data-testid='logout'>Sign Out</Link>
                        </div>
                    </div>
                    :
                    <div className={styles.loginWrapper}>
                        <Link to='/' className={styles.logOut}>Home</Link>
                        <Link to='' onClick={() => setToggleModal(!toggleModal)} className={styles.logOut} data-testid='login'>Log In</Link>
                    </div>

                }

                {toggleModal &&
                    <View switchHandler={switchFormHandler} showModalHandler={toggleModalHandler} />
                }

                {create &&
                    <ChatRoomForm toggleCreateForm={toggleCreateForm}></ChatRoomForm>
                }
            </header>
        </div>
    )
}