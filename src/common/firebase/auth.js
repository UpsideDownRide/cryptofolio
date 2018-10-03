import { auth, sessionPersistence } from './firebase'

export const createUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password)

export const signIn = (email, password) =>
    auth.setPersistence(sessionPersistence)
        .then(() => auth.signInWithEmailAndPassword(email, password))

export const signOut = () => auth.signOut()

export const passwordReset = (email) => 
    auth.sendPasswordResetEmail(email)

export const passwordUpdate = (password) =>
    auth.currentUser.updatePassword(password)

export const isEmailAvailable = async (email) => {
    const response = await auth.fetchSignInMethodsForEmail(email)
    return !response.length
}