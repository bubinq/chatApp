import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import styles from './Message.module.css'
import dayjs from 'dayjs'

export const Message = ({ message }) => {

    const { authUser } = useContext(AuthContext)

    return (
        <div className={authUser.uid === message.uid ? styles.messageWrapperRight : styles.messageWrapperLeft}>
            <div className={styles.nameWrapper}>
                <span className={styles.displayName}>{message.name}</span>
                <span className={styles.displayDate}>{dayjs(message?.createdAt).format('DD/MM - HH:mm:ss')}</span>
            </div>
            <span className={styles.msg}>{message.message}</span>
        </div>
    )
}