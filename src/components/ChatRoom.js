import styles from './ChatRoom.module.css'
import { useState, useEffect, useContext, useRef } from "react"
import { messageColRef } from './constants/FirebaseConstants'
import { addDoc, serverTimestamp, query, onSnapshot, limit, where } from 'firebase/firestore'
import { Message } from './Message'
import { AuthContext } from '../contexts/authContext'
import { useParams } from 'react-router'
import { Navigation } from './Navigation'

export const ChatRoom = () => {

    const bottom = useRef()
    const params = useParams()
    const { authUser } = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [collectMessages, setCollectMessages] = useState([])


    const addMessage = async (ev) => {
        ev.preventDefault()
        if (message.trim()) {
            await addDoc(messageColRef, {
                message,
                name: authUser.displayName,
                chatRoomId: params.chatroomId,
                uid: authUser.uid,
                createdAt: serverTimestamp()
            })
            bottom.current.scrollIntoView({ behavior: 'smooth' })
            setMessage('')
        }
        else {
            alert('Type a valid message!')
            setMessage('')
        }

    }

    useEffect(() => {
        const q = query(messageColRef, where('chatRoomId', '==', params.chatroomId), limit(20))
        const unsubscriber = onSnapshot(q, (querySnapshot) => {
            const currentMessages = []
            querySnapshot.forEach(doc => {
                currentMessages.push({ ...doc.data(), id: doc.id })
            });
            setCollectMessages(currentMessages)
            console.log(currentMessages);
        });
        return unsubscriber;
        // eslint-disable-next-line 
    }, [])

    if (!authUser) {
        return (
            <div className={styles.chatboxWrap}></div>
        )
    }
    return (
        <div className='chatRoomWrapper'>
            <Navigation></Navigation>
            <div className={styles.chatboxWrap}>
                <div className={styles.messages}>

                    {collectMessages?.sort((first, second) =>
                        first?.createdAt?.seconds <= second.createdAt?.seconds ? -1 : 1
                    )

                        ?.map(message => <Message key={message.id} message={message}></Message>)}
                    <div ref={bottom}></div>
                </div>

                <div className={styles.footer}>
                    <form onSubmit={addMessage}>
                        <input
                            type='text'
                            placeholder='Type your message here...'
                            value={message}
                            onChange={(ev) => setMessage(ev.target.value)}
                        >
                        </input>
                        <button className={styles.sendBtn}>Send</button>
                    </form>
                </div>

            </div>
        </div>



    )
}