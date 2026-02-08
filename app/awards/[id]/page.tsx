import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAwardById } from '@/lib/data/awards'
import { Trophy, CheckCircle, XCircle, Play, ArrowLeft } from 'lucide-react'

export default function AwardDetailPage({ params }: { params: { id: string } }) {
    const award = getAwardById(params.id)

    if (!award) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link href="/awards" className="inline-flex items-center space-x-2 text-gray-600 hover:text-ftc-orange mb-8">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Awards Hub</span>
                </Link>

                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <Trophy className="w-12 h-12 text-ftc-orange" />
                        <h1 className="text-4xl font-bold text-gray-900">{award.name}</h1>
                    </div>
                    <p className="text-xl text-gray-600 mb-6">{award.description}</p>

                    <div className="bg-blue-50 border-l-4 border-ftc-blue p-4 rounded">
                        <h3 className="font-semibold text-ftc-blue mb-2">What Judges Want to Hear</h3>
                        <p className="text-gray-700">{award.whatJudgesWant}</p>
                    </div>
                </div>

                {/* Strong Signals vs Red Flags */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center space-x-2">
                            <CheckCircle className="w-6 h-6" />
                            <span>Strong Signals</span>
                        </h2>
                        <ul className="space-y-3">
                            {award.strongSignals.map((signal, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{signal}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center space-x-2">
                            <XCircle className="w-6 h-6" />
                            <span>Red Flags</span>
                        </h2>
                        <ul className="space-y-3">
                            {award.redFlags.map((flag, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{flag}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Preparation Checklist */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Preparation Checklist</h2>
                    <ul className="space-y-2">
                        {award.checklist.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                                <input type="checkbox" className="mt-1 w-5 h-5 text-ftc-orange" />
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Example Structures */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Answer Structure Examples</h2>
                    <div className="space-y-4">
                        {award.exampleStructures.map((example, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-ftc-orange">
                                <p className="text-gray-700 italic">{example}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-ftc-orange to-orange-600 rounded-xl shadow-lg p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Practice?</h2>
                    <p className="text-lg mb-6">
                        Start a mock judging session focused on the {award.name}.
                    </p>
                    <Link
                        href={`/simulator?award=${award.id}`}
                        className="inline-flex items-center space-x-2 bg-white text-ftc-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        <Play className="w-5 h-5" />
                        <span>Start Mock Judging</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
