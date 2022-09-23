import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const RoomLink = ({ chatRoom, togglePopUp }) => {
    const [hasPass, setIsPrivate] = useState(false)

    useEffect(() => {
        if (chatRoom.isPrivate) {
            setIsPrivate(true)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {hasPass ?
                < Link to={`/chatroom/${chatRoom.id}`}  onClick={togglePopUp}> {chatRoom.name} &#128274; </Link >
                :
                < Link to={`/chatroom/${chatRoom.id}`} > {chatRoom.name} </Link >
            }
        </>
    )
}