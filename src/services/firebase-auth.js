import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'


export async function signUp(email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return result
}

export async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result

}

export const logout = async () => {
    const result = await signOut(auth)
    return result
}