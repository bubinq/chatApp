import { useEffect, useState } from "react"
import { Navigation } from "./Navigation"
import { chatRoomRef } from "./constants/FirebaseConstants"
import { onSnapshot, query } from "firebase/firestore"
import { Link } from "react-router-dom"
import styles from './HomePage.module.css'

export const HomePage = () => {
    const [chatRooms, setChatRooms] = useState([])

    useEffect(() => {
        const q = query(chatRoomRef)
        const unsubscribe = onSnapshot(q, (docs) => {
            const chatRoomsList = []
            docs.forEach(document => {
                chatRoomsList.push({ ...document.data(), id: document.id })
            });
            setChatRooms(chatRoomsList)
        })
        return unsubscribe
    }, [])
    return (
        <>
            <Navigation></Navigation>
            <div className={styles.homePageWrapper}>
                <div className={styles.chatRooms}>
                    {chatRooms.map(chatRoom => <Link key={chatRoom.id} to={`/chatroom/${chatRoom.id}`}>{chatRoom.name}</Link>)}
                </div>
            </div>
        </>
    )
}