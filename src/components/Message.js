import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import styles from './Message.module.css'

export const Message = ({ message }) => {

    const { authUser } = useContext(AuthContext)

    return (
        <div className={authUser.uid === message.uid ? styles.messageWrapperRight : styles.messageWrapperLeft}>
            <span className={styles.displayName}>{message.name}</span>
            <span className={styles.msg}>{message.message}</span>
        </div>
    )
}