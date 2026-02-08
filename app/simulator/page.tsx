'use client'

import { useState, useEffect, Suspense } from 'react'
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

function SimulatorContent() {
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
    const [answers, setAnswers] = useState<{ questionId: string; questionText: string; answerText: string }[]>([])
    const [currentAnswer, setCurrentAnswer] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(duration * 60) // seconds
    const [showCoachModal, setShowCoachModal] = useState(false)
    const [rubricScores, setRubricScores] = useState<any>(null)
    const [sessionStarted, setSessionStarted] = useState(false)

    // Voice interview state
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        if (stage === 'interview' && sessionStarted) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        handleFinishInterview()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [stage, sessionStarted])

    const handleStartSession = () => {
        const selectedQuestions = getQuestionsForSession(award, duration)
        setQuestions(selectedQuestions)
        setTimeRemaining(duration * 60)
        setSessionStarted(true)

        if (interviewModeType === 'voice') {
            setStage('voice-interview')
            const awardData = getAwardById(award)
            setMessages([
                {
                    role: 'assistant',
                    content: `Welcome to the ${awardData?.name} Award interview practice. I'll be asking you questions about your team's robot and journey. Let's begin! ${selectedQuestions[0]?.text || 'Tell me about your robot design.'}`
                }
            ])
        } else {
            setStage('interview')
        }
    }

    const handleAnswerSubmit = () => {
        if (!currentAnswer.trim()) return

        const newAnswers = [
            ...answers,
            {
                questionId: questions[currentQuestionIndex]?.id || `q${currentQuestionIndex}`,
                questionText: questions[currentQuestionIndex]?.text || '',
                answerText: currentAnswer,
            },
        ]
        setAnswers(newAnswers)
        setCurrentAnswer('')

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            handleFinishInterview()
        }
    }

    const handleFinishInterview = () => {
        setSessionStarted(false)
        const scores = calculateRubricScores(answers, award)
        setRubricScores(scores)
        setStage('results')
    }

    const handleVoiceFinish = (finalMessages: Message[]) => {
        // Extract Q&A from messages
        const extractedAnswers: { questionId: string; questionText: string; answerText: string }[] = []

        for (let i = 0; i < finalMessages.length - 1; i++) {
            if (finalMessages[i].role === 'assistant' && finalMessages[i + 1].role === 'user') {
                extractedAnswers.push({
                    questionId: `voice-q${i}`,
                    questionText: finalMessages[i].content,
                    answerText: finalMessages[i + 1].content,
                })
            }
        }

        setAnswers(extractedAnswers)
        const scores = calculateRubricScores(extractedAnswers, award)
        setRubricScores(scores)
        setStage('results')
    }

    const handleRestart = () => {
        setStage('setup')
        setCurrentQuestionIndex(0)
        setAnswers([])
        setCurrentAnswer('')
        setRubricScores(null)
        setMessages([])
        setSessionStarted(false)
    }

    const handleCoachHelp = () => {
        setShowCoachModal(true)
    }

    // SETUP SCREEN
    const SetupScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-ftc-blue to-blue-900 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-ftc-orange rounded-full mb-4">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Interview Practice Simulator</h1>
                    <p className="text-gray-600">Practice your FTC judging interview with AI feedback</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Interview Mode Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Interview Mode</label>
                        <div className="space-y-2">
                            <button
                                onClick={() => setInterviewModeType('text')}
                                className={`w-full p-4 rounded-lg border-2 transition-all ${interviewModeType === 'text'
                                    ? 'border-ftc-blue bg-blue-50 text-ftc-blue'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="font-semibold">📝 Text Interview</div>
                                <div className="text-sm text-gray-600">Type your answers</div>
                            </button>
                            <button
                                onClick={() => setInterviewModeType('voice')}
                                className={`w-full p-4 rounded-lg border-2 transition-all ${interviewModeType === 'voice'
                                    ? 'border-ftc-blue bg-blue-50 text-ftc-blue'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2 font-semibold">
                                    <Mic className="w-4 h-4" />
                                    <span>🎙️ Voice Interview (AI)</span>
                                </div>
                                <div className="text-sm text-gray-600">Speak naturally with AI judge</div>
                            </button>
                        </div>
                    </div>

                    {/* Award Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Target Award</label>
                        <select
                            value={award}
                            onChange={(e) => setAward(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-ftc-blue focus:outline-none"
                        >
                            <option value="inspire">🏆 Inspire Award</option>
                            <option value="think">🧠 Think Award</option>
                            <option value="design">📐 Design Award</option>
                            <option value="innovate">💡 Innovate Award</option>
                            <option value="control">🎮 Control Award</option>
                            <option value="motivate">⭐ Motivate Award</option>
                            <option value="connect">🤝 Connect Award</option>
                        </select>
                    </div>

                    {/* Difficulty Level */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Difficulty Level</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-ftc-blue focus:outline-none"
                        >
                            <option value="rookie">🌱 Rookie - Basic questions</option>
                            <option value="standard">⚙️ Standard - Typical interview</option>
                            <option value="advanced">🔥 Advanced - Deep technical</option>
                        </select>
                    </div>

                    {/* Interview Mode (Tone) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Interview Tone</label>
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value as InterviewMode)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-ftc-blue focus:outline-none"
                        >
                            <option value="friendly">😊 Friendly - Encouraging</option>
                            <option value="standard">👔 Standard - Professional</option>
                            <option value="pressure">😰 Pressure - Challenging</option>
                        </select>
                    </div>

                    {/* Duration (only for text mode) */}
                    {interviewModeType === 'text' && (
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Duration</label>
                            <div className="flex gap-3">
                                {[5, 10, 15].map((mins) => (
                                    <button
                                        key={mins}
                                        onClick={() => setDuration(mins)}
                                        className={`flex-1 p-3 rounded-lg border-2 transition-all ${duration === mins
                                            ? 'border-ftc-orange bg-orange-50 text-ftc-orange font-semibold'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {mins} minutes
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleStartSession}
                    className="w-full bg-ftc-orange hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
                >
                    <Play className="w-6 h-6" />
                    Start Interview
                </button>
            </div>
        </div>
    )

    // VOICE INTERVIEW SCREEN
    if (stage === 'voice-interview') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-ftc-blue to-blue-900 p-4">
                <div className="max-w-4xl mx-auto">
                    <VoiceChatInterface
                        award={award}
                        difficulty={difficulty}
                        mode={mode}
                        onFinish={handleVoiceFinish}
                        initialMessages={messages}
                    />
                </div>
            </div>
        )
    }

    // TEXT INTERVIEW SCREEN
    if (stage === 'interview') {
        const currentQuestion = questions[currentQuestionIndex]
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100

        return (
            <div className="min-h-screen bg-gradient-to-br from-ftc-blue to-blue-900 p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-ftc-blue text-white p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">{getAwardById(award)?.name} Interview</h2>
                                <Timer seconds={timeRemaining} />
                            </div>
                            <div className="w-full bg-blue-800 rounded-full h-2">
                                <div
                                    className="bg-ftc-orange h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-sm mt-2 text-blue-100">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </p>
                        </div>

                        {/* Question */}
                        <div className="p-8">
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <p className="text-xl font-semibold text-gray-900">{currentQuestion?.text}</p>
                            </div>

                            {/* Answer Input */}
                            <div className="mb-6">
                                <textarea
                                    value={currentAnswer}
                                    onChange={(e) => setCurrentAnswer(e.target.value)}
                                    placeholder="Type your answer here..."
                                    className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-ftc-blue focus:outline-none resize-none"
                                />
                                <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                                    <span>{currentAnswer.length} characters</span>
                                    <button
                                        onClick={handleCoachHelp}
                                        className="flex items-center gap-1 text-ftc-blue hover:text-blue-700"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                        Need a hint?
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAnswerSubmit}
                                    disabled={!currentAnswer.trim()}
                                    className="flex-1 bg-ftc-orange hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <>
                                            Next Question
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    ) : (
                                        'Finish Interview'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {showCoachModal && (
                    <CoachModal
                        questionText={currentQuestion?.text || ''}
                        award={award}
                        onClose={() => setShowCoachModal(false)}
                    />
                )}
            </div>
        )
    }

    // RESULTS SCREEN
    if (stage === 'results' && rubricScores) {
        const averageScore = rubricScores.scores.reduce((sum: number, s: any) => sum + s.score, 0) / rubricScores.scores.length

        return (
            <div className="min-h-screen bg-gradient-to-br from-ftc-blue to-blue-900 p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                                <Trophy className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Interview Complete!</h2>
                            <p className="text-xl text-gray-600">Overall Score: {averageScore.toFixed(1)} / 4.0</p>
                        </div>

                        {/* Rubric Scores */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Rubric Scores</h3>
                            <div className="space-y-3">
                                {rubricScores.scores.map((score: any, idx: number) => (
                                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-gray-900 capitalize">{score.category}</span>
                                            <span className="text-lg font-bold text-ftc-blue">{score.score} / 4</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{score.feedback}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Strengths */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-green-700 mb-2">💪 Strengths</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {rubricScores.strengths.map((strength: string, idx: number) => (
                                    <li key={idx}>{strength}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Weaknesses */}
                        {rubricScores.weaknesses.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-orange-700 mb-2">📝 Areas to Improve</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {rubricScores.weaknesses.map((weakness: string, idx: number) => (
                                        <li key={idx}>{weakness}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Recommendations */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-ftc-blue mb-2">💡 Recommendations</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {rubricScores.recommendations.map((rec: string, idx: number) => (
                                    <li key={idx}>{rec}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleRestart}
                                className="flex-1 bg-ftc-orange hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Try Again
                            </button>
                            <Link
                                href="/dashboard"
                                className="flex-1 bg-ftc-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                            >
                                View Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <SetupScreen />
}

export default function SimulatorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ftc-blue to-blue-900 text-white text-xl">Loading simulator...</div>}>
            <SimulatorContent />
        </Suspense>
    )
}
