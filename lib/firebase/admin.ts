import * as admin from 'firebase-admin'

// Initialize Firebase Admin SDK (singleton pattern)
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        })
        console.log('Firebase Admin initialized')
    } catch (error) {
        console.error('Firebase Admin initialization error:', error)
    }
}

const adminAuth = admin.auth()
const adminDb = admin.firestore()

/**
 * Verify Firebase ID token (for server-side authentication)
 */
export async function verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken | null> {
    try {
        const decodedToken = await adminAuth.verifyIdToken(token)
        return decodedToken
    } catch (error) {
        console.error('Token verification error:', error)
        return null
    }
}

/**
 * Get user by Firebase UID
 */
export async function getUserByUid(uid: string): Promise<admin.auth.UserRecord | null> {
    try {
        const user = await adminAuth.getUser(uid)
        return user
    } catch (error) {
        console.error('Get user error:', error)
        return null
    }
}

/**
 * Set custom user claims (e.g., role, permissions)
 */
export async function setCustomClaims(uid: string, claims: Record<string, any>): Promise<void> {
    try {
        await adminAuth.setCustomUserClaims(uid, claims)
    } catch (error) {
        console.error('Set custom claims error:', error)
        throw error
    }
}

/**
 * Delete user from Firebase Auth
 */
export async function deleteUser(uid: string): Promise<void> {
    try {
        await adminAuth.deleteUser(uid)
    } catch (error) {
        console.error('Delete user error:', error)
        throw error
    }
}

/**
 * Extract user from Authorization header
 */
export async function getUserFromRequest(authHeader: string | null): Promise<admin.auth.DecodedIdToken | null> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
    }

    const token = authHeader.substring(7)
    return await verifyIdToken(token)
}

export { adminAuth, adminDb }
