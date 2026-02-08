import { BarChart3, TrendingUp, Target } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    // In a real app, this would fetch from database
    const mockSessions = [
        { id: '1', date: '2024-02-05', award: 'Think', duration: 10, avgScore: 3.2 },
        { id: '2', date: '2024-02-03', award: 'Inspire', duration: 15, avgScore: 2.8 },
        { id: '3', date: '2024-02-01', award: 'Design', duration: 10, avgScore: 3.5 },
    ]

    const readinessEstimate = 72 // percentage

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Team Dashboard</h1>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={<BarChart3 className="w-8 h-8 text-ftc-orange" />}
                        title="Practice Sessions"
                        value={mockSessions.length}
                        subtitle="Total mock interviews"
                    />
                    <StatCard
                        icon={<TrendingUp className="w-8 h-8 text-green-600" />}
                        title="Avg Score"
                        value="3.2/4"
                        subtitle="Last 3 sessions"
                    />
                    <StatCard
                        icon={<Target className="w-8 h-8 text-ftc-blue" />}
                        title="Readiness"
                        value={`${readinessEstimate}%`}
                        subtitle="Based on recent activity"
                    />
                </div>

                {/* Session History */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice History</h2>
                    {mockSessions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Award</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockSessions.map((session) => (
                                        <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-gray-700">{session.date}</td>
                                            <td className="py-3 px-4">
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                                                    {session.award}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700">{session.duration} min</td>
                                            <td className="py-3 px-4">
                                                <span className={`font-semibold ${session.avgScore >= 3.5 ? 'text-green-600' : session.avgScore >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                    {session.avgScore.toFixed(1)}/4
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p className="mb-4">No practice sessions yet</p>
                            <Link
                                href="/simulator"
                                className="inline-block bg-ftc-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Start Your First Session
                            </Link>
                        </div>
                    )}
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Next Steps</h2>
                    <ul className="space-y-3">
                        <RecommendationItem text="Practice a 15-minute Inspire Award interview to improve comprehensive excellence" />
                        <RecommendationItem text="Review your Engineering Notebook and add specific test data" />
                        <RecommendationItem text="Complete the Readiness Check to identify gaps" />
                        <RecommendationItem text="Practice with team members who haven't done mock interviews yet" />
                    </ul>

                    <div className="mt-8 flex gap-4">
                        <Link
                            href="/simulator"
                            className="bg-ftc-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Start New Session
                        </Link>
                        <Link
                            href="/readiness"
                            className="bg-ftc-blue hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Check Readiness
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon, title, value, subtitle }: { icon: React.ReactNode; title: string; value: string | number; subtitle: string }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
                {icon}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    )
}

function RecommendationItem({ text }: { text: string }) {
    return (
        <li className="flex items-start space-x-3">
            <span className="text-ftc-orange font-bold flex-shrink-0 mt-1">→</span>
            <span className="text-gray-700">{text}</span>
        </li>
    )
}
