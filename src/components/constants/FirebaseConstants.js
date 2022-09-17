import { collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const messageColRef = collection(db, 'messages')
export const chatRoomRef = collection(db, 'chatroom')