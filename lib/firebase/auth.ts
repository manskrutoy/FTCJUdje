import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    User,
    UserCredential
} from 'firebase/auth'
import { app } from './config'

const auth = getAuth(app)

export interface SignUpData {
    email: string
    password: string
    displayName?: string
    teamNumber?: string
    role?: 'STUDENT' | 'MENTOR' | 'COACH'
    experienceLevel?: string
}

/**
 * Sign up a new user with email and password
 * Also creates user profile in database via API
 */
export async function signUp(data: SignUpData): Promise<UserCredential> {
    try {
        // Create Firebase user
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        )

        // Create user profile in database
        const token = await userCredential.user.getIdToken()
        await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                firebaseUid: userCredential.user.uid,
                email: data.email,
                displayName: data.displayName,
                teamNumber: data.teamNumber,
                role: data.role,
                experienceLevel: data.experienceLevel
            })
        })

        return userCredential
    } catch (error: any) {
        console.error('Sign up error:', error)
        throw new Error(getAuthErrorMessage(error.code))
    }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<UserCredential> {
    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
        console.error('Sign in error:', error)
        throw new Error(getAuthErrorMessage(error.code))
    }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
    try {
        await firebaseSignOut(auth)
    } catch (error) {
        console.error('Sign out error:', error)
        throw new Error('Failed to sign out')
    }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
        console.error('Password reset error:', error)
        throw new Error(getAuthErrorMessage(error.code))
    }
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback)
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
    return auth.currentUser
}

/**
 * Get current user's ID token
 */
export async function getIdToken(): Promise<string | null> {
    const user = getCurrentUser()
    if (!user) return null
    return await user.getIdToken()
}

/**
 * Convert Firebase error codes to user-friendly messages
 */
function getAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please sign in instead.'
        case 'auth/invalid-email':
            return 'Invalid email address.'
        case 'auth/operation-not-allowed':
            return 'Email/password sign-in is not enabled.'
        case 'auth/weak-password':
            return 'Password is too weak. Please use at least 6 characters.'
        case 'auth/user-disabled':
            return 'This account has been disabled.'
        case 'auth/user-not-found':
            return 'No account found with this email.'
        case 'auth/wrong-password':
            return 'Incorrect password.'
        case 'auth/invalid-credential':
            return 'Invalid email or password.'
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.'
        default:
            return 'An error occurred. Please try again.'
    }
}

export { auth }
