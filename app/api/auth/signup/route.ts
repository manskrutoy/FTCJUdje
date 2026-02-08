import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/firebase/admin'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization')
        const firebaseUser = await getUserFromRequest(authHeader)

        if (!firebaseUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { firebaseUid, email, displayName, teamNumber, role, experienceLevel } = await req.json()

        // Validate that the token matches the user being created
        if (firebaseUser.uid !== firebaseUid) {
            return NextResponse.json({ error: 'User mismatch' }, { status: 403 })
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { firebaseUid }
        })

        if (existingUser) {
            return NextResponse.json({ user: existingUser }, { status: 200 })
        }

        // Create new user
        const user = await prisma.user.create({
            data: {
                firebaseUid,
                email,
                displayName,
                teamNumber,
                role: role || 'STUDENT',
                experienceLevel: experienceLevel || 'rookie'
            }
        })

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        console.error('User creation error:', error)
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        )
    }
}
