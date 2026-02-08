'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { VoiceRecognition, speak, stopSpeaking } from '@/lib/speech/voiceUtils'
import type { Message } from '@/lib/ai/groqClient'
import type { DifficultyLevel, InterviewMode } from '@/lib/ai/judgePrompts'

interface VoiceChatInterfaceProps {
    award: string
    difficulty: DifficultyLevel
    mode: InterviewMode
    onComplete: (conversationHistory: Message[]) => void
}


export default function VoiceChatInterface({ award, difficulty, mode, onComplete }: VoiceChatInterfaceProps) {
    const [conversationHistory, setConversationHistory] = useState<Message[]>([])
    const [isListening, setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isThinking, setIsThinking] = useState(false)
    const [currentTranscript, setCurrentTranscript] = useState('')
    const [questionCount, setQuestionCount] = useState(0)
    const [error, setError] = useState('')

    const voiceRecognition = useRef<VoiceRecognition | null>(null)
    const maxQuestions = 6

    useEffect(() => {
        if (typeof window !== 'undefined') {
            voiceRecognition.current = new VoiceRecognition(
                handleTranscriptResult,
                handleVoiceError
            )
        }

        // Start with AI's first question
        startInterview()

        return () => {
            stopSpeaking()
        }
    }, [])

    const startInterview = async () => {
        const initialHistory: Message[] = [
            {
                role: 'user',
                content: 'Start the interview'
            }
        ]

        await askAIQuestion(initialHistory)
    }

    const askAIQuestion = async (history: Message[]) => {
        setIsThinking(true)

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    award,
                    difficulty,
                    mode,
                    conversationHistory: history
                })
            })

            const data = await response.json()
            const aiQuestion = data.question

            const newHistory: Message[] = [
                ...history,
                { role: 'assistant', content: aiQuestion }
            ]

            setConversationHistory(newHistory)
            setQuestionCount(prev => prev + 1)

            // Speak the question
            setIsThinking(false)
            setIsSpeaking(true)
            await speak(aiQuestion)
            setIsSpeaking(false)

            // Auto-start listening after AI finishes speaking
            setTimeout(() => {
                if (voiceRecognition.current && !isListening) {
                    voiceRecognition.current.start()
                    setIsListening(true)
                }
            }, 500)

            // Check if interview should end
            if (questionCount >= maxQuestions || aiQuestion.toLowerCase().includes('thank you')) {
                setTimeout(() => onComplete(newHistory), 1000)
            }
        } catch (err) {
            console.error('AI error:', err)
            setError('Failed to get AI response')
            setIsThinking(false)
        }
    }

    const handleTranscriptResult = (transcript: string) => {
        setCurrentTranscript(transcript)
        setIsListening(false)

        // Add user's answer to history
        const newHistory: Message[] = [
            ...conversationHistory,
            { role: 'user', content: transcript }
        ]

        setConversationHistory(newHistory)
        setCurrentTranscript('')

        // Ask next question
        askAIQuestion(newHistory)
    }

    const handleVoiceError = (errorMsg: string) => {
        setError(`Voice error: ${errorMsg}`)
        setIsListening(false)
    }

    const startListening = () => {
        if (voiceRecognition.current && !isListening && !isSpeaking) {
            setError('')
            voiceRecognition.current.start()
            setIsListening(true)
        }
    }

    const stopListening = () => {
        if (voiceRecognition.current) {
            voiceRecognition.current.stop()
            setIsListening(false)
        }
    }

    const toggleMute = () => {
        if (isSpeaking) {
            stopSpeaking()
            setIsSpeaking(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-ftc-blue to-blue-900 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">AI Voice Interview</h1>
                    <p className="text-blue-200 text-lg capitalize">{award} Award Practice</p>
                    <p className="text-blue-300 mt-2">Question {questionCount} of {maxQuestions}</p>
                </div>

                {/* AI Status */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-ftc-orange flex items-center justify-center">
                            {isThinking ? (
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                            ) : isSpeaking ? (
                                <Volume2 className="w-8 h-8 text-white animate-pulse" />
                            ) : (
                                <Mic className="w-8 h-8 text-white" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">AI Judge</h3>
                            <p className="text-gray-600">
                                {isThinking ? 'Thinking...' : isSpeaking ? 'Speaking...' : isListening ? 'Listening to you...' : 'Ready'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Conversation History */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 max-h-96 overflow-y-auto">
                    <h2 className="font-bold text-gray-900 mb-4">Conversation</h2>
                    {conversationHistory.length === 0 ? (
                        <p className="text-gray-500 text-center">Interview will start shortly...</p>
                    ) : (
                        <div className="space-y-4">
                            {conversationHistory.filter(m => m.role !== 'system').map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg p-4 ${msg.role === 'assistant'
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'bg-ftc-orange text-white'
                                            }`}
                                    >
                                        <p className="text-sm font-semibold mb-1">
                                            {msg.role === 'assistant' ? 'AI Judge' : 'You'}
                                        </p>
                                        <p>{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Microphone Control */}
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    {currentTranscript && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">Recording: {currentTranscript}</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={isSpeaking || isThinking}
                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${isListening
                            ? 'bg-red-500 animate-pulse'
                            : 'bg-ftc-orange hover:bg-orange-600'
                            }`}
                    >
                        {isListening ? (
                            <MicOff className="w-16 h-16 text-white" />
                        ) : (
                            <Mic className="w-16 h-16 text-white" />
                        )}
                    </button>

                    <p className="mt-4 text-gray-600 font-semibold">
                        {isListening ? 'Speak your answer (will auto-detect when you finish)' : isSpeaking ? 'AI is speaking...' : isThinking ? 'AI is thinking...' : 'Recording will start automatically'}
                    </p>

                    {isSpeaking && (
                        <button
                            onClick={toggleMute}
                            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center space-x-2 mx-auto"
                        >
                            <VolumeX className="w-5 h-5" />
                            <span>Mute AI</span>
                        </button>
                    )}
                </div>

                {/* Complete Button */}
                {questionCount >= 3 && (
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => onComplete(conversationHistory)}
                            className="bg-white text-ftc-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            End Interview & See Results
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
