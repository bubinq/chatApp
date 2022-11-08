import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [chatRooms, setChatRooms] = useLocalStorage("rooms", []);
    const [showCreateRoom, setShowCreateRoom] = useState(true)

    const toggleCreateRoom = (value) => {
        setShowCreateRoom(value)
    }

    useEffect(() => {
        console.log(chatRooms);
    }, [chatRooms]);

    return (
        <RoomContext.Provider value={{ setChatRooms, chatRooms, toggleCreateRoom, showCreateRoom }}>
            {children}
        </RoomContext.Provider>
    );
};
