import { useEffect, useState } from "react"
import { Navigation } from "./Navigation"
import { chatRoomRef } from "./constants/FirebaseConstants"
import { onSnapshot, query } from "firebase/firestore"
import styles from './HomePage.module.css'
import { RoomLink } from "./RoomLink"
import { PassPopUp } from "./PassPopUp"

export const HomePage = () => {
    const [chatRooms, setChatRooms] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [roomId, setRoomId] = useState('')

    const togglePopUp = (ev) => {
        ev.preventDefault()
        setShowPopUp(!showPopUp)
        if (roomId === '' || ev.target.tagName === 'A') {
            let room = ev.target.href.split('/').reverse()[0]
            setRoomId(room)
        }
    }

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
            <Navigation chatRooms={chatRooms}></Navigation>
            <div className={styles.homePageWrapper}>
                <div className={styles.chatRooms}>
                    {chatRooms.map(chatRoom => <RoomLink key={chatRoom.id} chatRoom={chatRoom} togglePopUp={togglePopUp}></RoomLink>)}
                </div>
                {showPopUp &&
                    <PassPopUp togglePopUp={togglePopUp} chatRoom={chatRooms} id={roomId}></PassPopUp>
                }
            </div>
        </>
    )
}