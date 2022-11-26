import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [chatRooms, setChatRooms] = useLocalStorage("rooms", []);
    const [showCreateRoom, setShowCreateRoom] = useState(true)
    const [toggleModal, setToggleModal] = useState(false);

    const toggleCreateRoom = (value) => {
        setShowCreateRoom(value)
    }
    const toggleLoginModal = () => {
        setToggleModal(!toggleModal)
    }


    return (
        <RoomContext.Provider value={{ setChatRooms, chatRooms, toggleCreateRoom, showCreateRoom, toggleLoginModal, toggleModal }}>
            {children}
        </RoomContext.Provider>
    );
};
