'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getQuestionsForSession } from '@/lib/data/questions'
import { getAwardById } from '@/lib/data/awards'
import { calculateRubricScores } from '@/lib/rubricEngine'
import { getCoachHints } from '@/lib/coachEngine'
import Timer from '@/components/Timer'
import CoachModal from '@/components/CoachModal'
import VoiceChatInterface from '@/components/VoiceChatInterface'
import { Play, HelpCircle, ArrowRight, Trophy, Mic } from 'lucide-react'
import Link from 'next/link'
import type { Message } from '@/lib/ai/groqClient'
import type { DifficultyLevel, InterviewMode } from '@/lib/ai/judgePrompts'

type Stage = 'setup' | 'interview' | 'voice-interview' | 'results'
type InterviewModeType = 'text' | 'voice'

export default function SimulatorPage() {
    const searchParams = useSearchParams()
    const preselectedAward = searchParams?.get('award') || 'inspire'

    const [stage, setStage] = useState<Stage>('setup')
    const [interviewModeType, setInterviewModeType] = useState<InterviewModeType>('text')
    const [difficulty, setDifficulty] = useState<DifficultyLevel>('standard')
    const [mode, setMode] = useState<InterviewMode>('standard')
    const [award, setAward] = useState(preselectedAward)
    const [duration, setDuration] = useState(10) // minutes
    const [questions, setQuestions] = useState<any[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<any[]>([])
    const [currentAnswer, setCurrentAnswer] = useState('')
    const [coachModalOpen, setCoachModalOpen] = useState(false)
    const [coachHintsUsed, setCoachHintsUsed] = useState(0)
    const [report, setReport] = useState<any>(null)

    const startInterview = () => {
        if (interviewModeType === 'voice') {
            setStage('voice-interview')
        } else {
            const questionCount = duration === 5 ? 3 : duration === 10 ? 5 : 8
            const selectedQuestions = getQuestionsForSession(award, questionCount)
            setQuestions(selectedQuestions)
            setAnswers([])
            setCurrentQuestionIndex(0)
            setCurrentAnswer('')
            setStage('interview')
        }
    }

    const handleVoiceInterviewComplete = (conversationHistory: Message[]) => {
        // Convert voice conversation to answers format
        const voiceAnswers = conversationHistory
            .filter(m => m.role === 'user' && m.content !== 'Start the interview')
            .map((msg, idx) => ({
                questionId: `voice-${idx}`,
                questionText: conversationHistory[idx * 2]?.content || 'Question',
                answerText: msg.content,
                coachHintsUsed: 0
            }))

        completeInterview(voiceAnswers)
    }

    const handleNextQuestion = () => {
        // Save current answer
        const newAnswer = {
            questionId: questions[currentQuestionIndex].id,
            questionText: questions[currentQuestionIndex].text,
            answerText: currentAnswer,
            coachHintsUsed,
        }
        setAnswers([...answers, newAnswer])
        setCurrentAnswer('')
        setCoachHintsUsed(0)

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            completeInterview([...answers, newAnswer])
        }
    }

    const completeInterview = (finalAnswers: any[]) => {
        const feedback = calculateRubricScores(finalAnswers, award)
        setReport(feedback)
        setStage('results')
    }

    const handleTimerComplete = () => {
        if (stage === 'interview') {
            const finalAnswers = answers.length < questions.length
                ? [...answers, {
                    questionId: questions[currentQuestionIndex].id,
                    questionText: questions[currentQuestionIndex].text,
                    answerText: currentAnswer,
                    coachHintsUsed,
                }]
                : answers
            completeInterview(finalAnswers)
        }
    }

    if (stage === 'setup') {
        return (
            <SetupScreen
                award={award}
                setAward={setAward}
                interviewMode={interviewModeType}
                setInterviewMode={setInterviewModeType}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                mode={mode}
                setMode={setMode}
                duration={duration}
                setDuration={setDuration}
                onStart={startInterview}
            />
        )
    }

    if (stage === 'voice-interview') {
        return (
            <VoiceChatInterface
                award={award}
                difficulty={difficulty}
                mode={mode}
                onComplete={handleVoiceInterviewComplete}
            />
        )
    }

    if (stage === 'interview') {
        const currentQuestion = questions[currentQuestionIndex]
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Timer */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <Timer duration={duration * 60} onComplete={handleTimerComplete} />
                    </div>

                    {/* Progress */}
                    <div className="mb-6 text-center">
                        <p className="text-gray-600">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                                className="bg-ftc-orange h-2 rounded-full transition-all"
                                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentQuestion.text}</h2>
                        <textarea
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                            className="w-full h-48 border-2 border-gray-300 rounded-lg p-4 focus:border-ftc-orange focus:outline-none resize-none"
                            placeholder="Type your answer here..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => {
                                setCoachModalOpen(true)
                                setCoachHintsUsed(coachHintsUsed + 1)
                            }}
                            className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <HelpCircle className="w-5 h-5" />
                            <span>Coach Mode</span>
                        </button>

                        <button
                            onClick={handleNextQuestion}
                            disabled={!currentAnswer.trim()}
                            className="flex items-center space-x-2 bg-ftc-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <CoachModal
                        isOpen={coachModalOpen}
                        onClose={() => setCoachModalOpen(false)}
                        hints={getCoachHints(currentQuestion.id)}
                    />
                </div>
            </div>
        )
    }

    if (stage === 'results' && report) {
        return <ResultsScreen award={award} report={report} onRestart={() => setStage('setup')} />
    }

    return null
}

function SetupScreen({ award, setAward, interviewMode, setInterviewMode, difficulty, setDifficulty, mode, setMode, duration, setDuration, onStart }: any) {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Mock Judging Setup</h1>

                    {/* Interview Mode Selection */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                            Interview Mode
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setInterviewMode('text')}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all flex items-center justify-center space-x-2 ${interviewMode === 'text'
                                    ? 'border-ftc-blue bg-blue-50 text-ftc-blue'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <Play className="w-5 h-5" />
                                <span>Text-based</span>
                            </button>
                            <button
                                onClick={() => setInterviewMode('voice')}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all flex items-center justify-center space-x-2 ${interviewMode === 'voice'
                                    ? 'border-ftc-orange bg-orange-50 text-ftc-orange'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <Mic className="w-5 h-5" />
                                <span>AI Voice Chat 🎤</span>
                            </button>
                        </div>
                        {interviewMode === 'voice' && (
                            <p className="mt-2 text-sm text-gray-600">
                                💡 Practice with real-time AI judge conversation using your voice!
                            </p>
                        )}
                    </div>

                    {/* Award Selection */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                            Select Award Focus
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {['inspire', 'think', 'design', 'impact', 'control', 'connect', 'innovate'].map((a) => (
                                <button
                                    key={a}
                                    onClick={() => setAward(a)}
                                    className={`p-4 rounded-lg border-2 font-semibold capitalize transition-all ${award === a
                                        ? 'border-ftc-orange bg-orange-50 text-ftc-orange'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty Level Selection - NEW */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                            Difficulty Level
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                onClick={() => setDifficulty('rookie')}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all ${difficulty === 'rookie'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <div className="text-base">🌱 Rookie</div>
                                <div className="text-xs mt-1 text-gray-600">Simple questions</div>
                            </button>
                            <button
                                onClick={() => setDifficulty('standard')}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all ${difficulty === 'standard'
                                    ? 'border-ftc-blue bg-blue-50 text-ftc-blue'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <div className="text-base">⚙️ Standard</div>
                                <div className="text-xs mt-1 text-gray-600">Competition-level</div>
                            </button>
                            <button
                                onClick={() => setDifficulty('advanced')}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all ${difficulty === 'advanced'
                                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <div className="text-base">🏆 Advanced</div>
                                <div className="text-xs mt-1 text-gray-600">Championship-level</div>
                            </button>
                        </div>
                    </div>

                    {/* Interview Style Selection - NEW */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                            Judge Personality
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                onClick={() => setMode('friendly')}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all ${mode === 'friendly'
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <div className="text-base">😊 Friendly</div>
                                <div className="text-xs mt-1 text-gray-600">Warm & supportive</div>
                            </button>
                            <button
                                onClick={() => setMode('standard')}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all ${mode === 'standard'
                                    ? 'border-ftc-blue bg-blue-50 text-ftc-blue'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <div className="text-base">🎯 Standard</div>
                                <div className="text-xs mt-1 text-gray-600">Professional</div>
                            </button>
                            <button
                                onClick={() => setMode('pressure')}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all ${mode === 'pressure'
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <div className="text-base">🔥 Pressure</div>
                                <div className="text-xs mt-1 text-gray-600">High-stakes</div>
                            </button>
                        </div>
                    </div>

                    {/* Duration Selection */}
                    <div className="mb-8">
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                            Session Duration
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {[5, 10, 15].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDuration(d)}
                                    className={`p-4 rounded-lg border-2 font-semibold transition-all ${duration === d
                                        ? 'border-ftc-blue bg-blue-50 text-ftc-blue'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    {d} minutes
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onStart}
                        className="w-full bg-ftc-orange hover:bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                        <Play className="w-6 h-6" />
                        <span>Start Interview</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

function ResultsScreen({ award, report, onRestart }: any) {
    const awardInfo = getAwardById(award)

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-8">
                    <Trophy className="w-16 h-16 text-ftc-orange mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Session Complete!</h1>
                    <p className="text-xl text-gray-600">
                        Here's your feedback for {awardInfo?.name}
                    </p>
                </div>

                {/* Rubric Scores */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Rubric Scores</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {report.scores.map((score: any) => (
                            <div key={score.category}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold capitalize">{score.category}</span>
                                    <span className="text-2xl font-bold text-ftc-orange">{score.score}/4</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full ${score.score >= 4 ? 'bg-green-500' : score.score >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${(score.score / 4) * 100}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{score.feedback}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-green-600 mb-4">Strengths</h3>
                        <ul className="space-y-2">
                            {report.strengths.map((s: string, idx: number) => (
                                <li key={idx} className="flex items-start space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span className="text-gray-700">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-red-600 mb-4">Areas to Improve</h3>
                        <ul className="space-y-2">
                            {report.weaknesses.map((w: string, idx: number) => (
                                <li key={idx} className="flex items-start space-x-2">
                                    <span className="text-red-500">•</span>
                                    <span className="text-gray-700">{w}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h3 className="text-xl font-bold text-ftc-blue mb-4">Next Steps & Recommendations</h3>
                    <ul className="space-y-3">
                        {report.recommendations.map((r: string, idx: number) => (
                            <li key={idx} className="flex items-start space-x-2">
                                <span className="text-ftc-orange font-bold">{idx + 1}.</span>
                                <span className="text-gray-700">{r}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onRestart}
                        className="bg-ftc-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Practice Again
                    </button>
                    <Link
                        href="/dashboard"
                        className="bg-ftc-blue hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        View Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}
