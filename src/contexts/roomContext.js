import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage'

export const RoomContext = createContext()


export const RoomProvider = ({ children }) => {
    const [chatRooms, setChatRooms] = useState([])
    const [localStorage, setLocalStorage] = useLocalStorage('rooms', [])

    useEffect(() => {
        setLocalStorage(chatRooms)
    }, [chatRooms, localStorage, setLocalStorage ])
    return (
        <RoomContext.Provider value={{ setChatRooms, chatRooms }}>
            {children}
        </RoomContext.Provider>
    )
}