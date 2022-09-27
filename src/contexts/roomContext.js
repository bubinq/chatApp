import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const [lstorage, setLocalStorage] = useLocalStorage("rooms", []);

    useEffect(() => {
        setLocalStorage(chatRooms)
    }, [chatRooms, lstorage, setLocalStorage]);

    return (
        <RoomContext.Provider value={{ setChatRooms, chatRooms }}>
            {children}
        </RoomContext.Provider>
    );
};
