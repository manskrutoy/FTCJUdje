'use client'

import { useState } from 'react'
import { readinessQuiz, calculateReadinessScore, getActionPlan } from '@/lib/data/readinessQuiz'
import { CheckCircle, XCircle, Calendar } from 'lucide-react'

export default function ReadinessPage() {
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [submitted, setSubmitted] = useState(false)
    const [selectedDays, setSelectedDays] = useState(7)

    const handleAnswer = (questionId: string, score: number) => {
        setAnswers({ ...answers, [questionId]: score })
    }

    const handleSubmit = () => {
        if (Object.keys(answers).length === readinessQuiz.length) {
            setSubmitted(true)
        }
    }

    if (!submitted) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Readiness Check</h1>
                        <p className="text-xl text-gray-600">
                            Answer these 10 questions to assess your team's judging preparation
                        </p>
                    </div>

                    <div className="space-y-6">
                        {readinessQuiz.map((question, idx) => (
                            <div key={question.id} className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    {idx + 1}. {question.text}
                                </h3>
                                <div className="space-y-2">
                                    {question.options.map((option, optIdx) => (
                                        <label
                                            key={optIdx}
                                            className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${answers[question.id] === option.score
                                                    ? 'border-ftc-orange bg-orange-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option.score}
                                                checked={answers[question.id] === option.score}
                                                onChange={() => handleAnswer(question.id, option.score)}
                                                className="w-5 h-5 text-ftc-orange"
                                            />
                                            <span className="text-gray-700">{option.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(answers).length < readinessQuiz.length}
                            className="bg-ftc-orange hover:bg-orange-600 text-white px-12 py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Calculate Readiness Score
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const { percentage, categoryScores } = calculateReadinessScore(answers)
    const actionPlan = getActionPlan(percentage, selectedDays)

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-8">
                    <div className={`inline-block text-6xl font-bold mb-4 ${percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                        {percentage}%
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {percentage >= 80 ? 'Excellent! You\'re Ready' : percentage >= 60 ? 'Good Progress' : 'Needs Work'}
                    </h1>
                    <p className="text-xl text-gray-600">
                        Your team's judging readiness score
                    </p>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Breakdown</h2>
                    <div className="space-y-4">
                        {Object.entries(categoryScores).map(([category, data]) => {
                            const catPercentage = Math.round((data.score / data.max) * 100)
                            return (
                                <div key={category}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold capitalize">{category}</span>
                                        <span className="text-lg font-bold text-ftc-orange">{catPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full ${catPercentage >= 80 ? 'bg-green-500' : catPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${catPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Action Plan */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                            <Calendar className="w-6 h-6 text-ftc-orange" />
                            <span>Action Plan</span>
                        </h2>
                        <select
                            value={selectedDays}
                            onChange={(e) => setSelectedDays(Number(e.target.value))}
                            className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-ftc-orange focus:outline-none"
                        >
                            <option value={3}>3 days</option>
                            <option value={7}>7 days</option>
                            <option value={14}>14 days</option>
                        </select>
                    </div>

                    <ul className="space-y-3">
                        {actionPlan.map((step, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-ftc-orange flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-r from-ftc-blue to-blue-700 rounded-xl shadow-lg p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to Improve?</h2>
                    <p className="mb-6">Start practicing with our Mock Judging Simulator</p>
                    <a
                        href="/simulator"
                        className="inline-block bg-white text-ftc-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Start Mock Interview
                    </a>
                </div>
            </div>
        </div>
    )
}
