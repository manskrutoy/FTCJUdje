'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from 'firebase/auth'
import { onAuthChange, signIn as authSignIn, signOut as authSignOut, signUp as authSignUp, type SignUpData } from '@/lib/firebase/auth'

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (data: SignUpData) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthChange((user) => {
            setUser(user)
            setLoading(false)
        })

        // Cleanup subscription
        return () => unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        try {
            await authSignIn(email, password)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (data: SignUpData) => {
        setLoading(true)
        try {
            await authSignUp(data)
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        setLoading(true)
        try {
            await authSignOut()
        } finally {
            setLoading(false)
        }
    }

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

/**
 * Custom hook to access auth context
 * Must be used within AuthProvider
 */
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
