'use client'

import { useState } from 'react'
import { resetPassword } from '@/lib/firebase/auth'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await resetPassword(email)
            setSent(true)
        } catch (err: any) {
            setError(err.message || 'Failed to send reset email')
        } finally {
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-ftc-blue to-blue-900 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
                    <p className="text-gray-600 mb-6">
                        We've sent a password reset link to <strong>{email}</strong>
                    </p>
                    <Link
                        href="/auth/login"
                        className="inline-block bg-ftc-blue hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-ftc-blue to-blue-900 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
                    <p className="text-gray-600">Enter your email to receive a reset link</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ftc-blue focus:border-transparent"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ftc-orange hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/auth/login" className="text-ftc-blue hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
