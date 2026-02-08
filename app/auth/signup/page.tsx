'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Mail, Lock, User, Hash, Users } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
    const router = useRouter()
    const { signUp } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        teamNumber: '',
        role: 'STUDENT' as 'STUDENT' | 'MENTOR' | 'COACH',
        experienceLevel: 'rookie'
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        try {
            await signUp({
                email: formData.email,
                password: formData.password,
                displayName: formData.displayName,
                teamNumber: formData.teamNumber,
                role: formData.role,
                experienceLevel: formData.experienceLevel
            })

            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message || 'Failed to create account')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-ftc-blue to-blue-900 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join FTC Judge Prep to track your progress</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Display Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Display Name *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ftc-blue focus:border-transparent"
                                placeholder="Your name"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email *
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ftc-blue focus:border-transparent"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ftc-blue focus:border-transparent"
                                placeholder="Minimum 6 characters"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirm Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ftc-blue focus:border-transparent"
                                placeholder="Re-enter password"
                            />
                        </div>
                    </div>

                    {/* Team Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Team Number (optional)
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.teamNumber}
                                onChange={(e) => setFormData({ ...formData, teamNumber: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ftc-blue focus:border-transparent"
                                placeholder="e.g. 12345"
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Role *
                        </label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'STUDENT' | 'MENTOR' | 'COACH' })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ftc-blue focus:border-transparent appearance-none"
                            >
                                <option value="STUDENT">Student</option>
                                <option value="MENTOR">Mentor</option>
                                <option value="COACH">Coach</option>
                            </select>
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Experience Level
                        </label>
                        <select
                            value={formData.experienceLevel}
                            onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ftc-blue focus:border-transparent"
                        >
                            <option value="rookie">Rookie (First year)</option>
                            <option value="veteran">Veteran (2-3 years)</option>
                            <option value="expert">Expert (4+ years)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ftc-orange hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-ftc-blue font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
