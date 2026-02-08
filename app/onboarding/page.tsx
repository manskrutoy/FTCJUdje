'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trophy } from 'lucide-react'

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [teamData, setTeamData] = useState({
        name: '',
        number: '',
        level: 'rookie' as 'rookie' | 'intermediate' | 'advanced',
        targetAwards: [] as string[],
        robotDescription: '',
        innovations: '',
        outreachSummary: '',
    })

    const handleSubmit = () => {
        // In a real app, this would save to database
        console.log('Team data:', teamData)
        router.push('/simulator')
    }

    if (step === 1) {
        return (
            <OnboardingLayout step={1} totalSteps={4}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your team</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Team Name</label>
                        <input
                            type="text"
                            value={teamData.name}
                            onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-ftc-orange focus:outline-none"
                            placeholder="e.g., Robo Warriors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Team Number (optional)</label>
                        <input
                            type="text"
                            value={teamData.number}
                            onChange={(e) => setTeamData({ ...teamData, number: e.target.value })}
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-ftc-orange focus:outline-none"
                            placeholder="e.g., 12345"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                        <div className="grid grid-cols-3 gap-4">
                            {(['rookie', 'intermediate', 'advanced'] as const).map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setTeamData({ ...teamData, level })}
                                    className={`p-3 rounded-lg border-2 font-semibold capitalize transition-all ${teamData.level === level
                                            ? 'border-ftc-orange bg-orange-50 text-ftc-orange'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setStep(2)}
                    disabled={!teamData.name}
                    className="mt-8 w-full bg-ftc-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors"
                >
                    Continue
                </button>
            </OnboardingLayout>
        )
    }

    if (step === 2) {
        return (
            <OnboardingLayout step={2} totalSteps={4}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Target Awards</h2>
                <p className="text-gray-600 mb-6">Which awards are you preparing for? (Select all that apply)</p>

                <div className="space-y-3">
                    {['inspire', 'think', 'design', 'innovate', 'control', 'connect', 'motivate', 'promote'].map((award) => (
                        <label
                            key={award}
                            className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer hover:border-gray-400 transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={teamData.targetAwards.includes(award)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setTeamData({ ...teamData, targetAwards: [...teamData.targetAwards, award] })
                                    } else {
                                        setTeamData({ ...teamData, targetAwards: teamData.targetAwards.filter(a => a !== award) })
                                    }
                                }}
                                className="w-5 h-5 text-ftc-orange"
                            />
                            <span className="font-semibold capitalize">{award} Award</span>
                        </label>
                    ))}
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => setStep(3)}
                        disabled={teamData.targetAwards.length === 0}
                        className="flex-1 bg-ftc-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors"
                    >
                        Continue
                    </button>
                </div>
            </OnboardingLayout>
        )
    }

    if (step === 3) {
        return (
            <OnboardingLayout step={3} totalSteps={4}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Optional: Tell us more</h2>
                <p className="text-gray-600 mb-6">This helps personalize your practice (completely optional)</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Robot Description</label>
                        <textarea
                            value={teamData.robotDescription}
                            onChange={(e) => setTeamData({ ...teamData, robotDescription: e.target.value })}
                            className="w-full h-24 border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-ftc-orange focus:outline-none resize-none"
                            placeholder="Brief description of your robot..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Key Innovations</label>
                        <textarea
                            value={teamData.innovations}
                            onChange={(e) => setTeamData({ ...teamData, innovations: e.target.value })}
                            className="w-full h-24 border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-ftc-orange focus:outline-none resize-none"
                            placeholder="What makes your robot unique..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Outreach Summary</label>
                        <textarea
                            value={teamData.outreachSummary}
                            onChange={(e) => setTeamData({ ...teamData, outreachSummary: e.target.value })}
                            className="w-full h-24 border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-ftc-orange focus:outline-none resize-none"
                            placeholder="Community activities, workshops, etc..."
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => setStep(2)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-ftc-orange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                        {teamData.robotDescription || teamData.innovations || teamData.outreachSummary ? 'Save & Start' : 'Skip & Start'}
                    </button>
                </div>
            </OnboardingLayout>
        )
    }

    return null
}

function OnboardingLayout({ step, totalSteps, children }: { step: number; totalSteps: number; children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="text-center mb-8">
                    <Trophy className="w-12 h-12 text-ftc-orange mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FTC Judge Prep</h1>
                    <p className="text-gray-600">Step {step} of {totalSteps}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div
                            className="bg-ftc-orange h-2 rounded-full transition-all"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
