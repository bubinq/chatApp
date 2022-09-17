import { getDocs } from "firebase/firestore";
import { chatRoomRef } from "../components/constants/FirebaseConstants";

export async function getChatRooms() {
    const response = await getDocs(chatRoomRef)
    return response
}