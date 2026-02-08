import { NextRequest, NextResponse } from 'next/server'
import { generateInterviewQuestion, type Message, type DifficultyLevel, type InterviewMode } from '@/lib/ai/judgePrompts'

export async function POST(req: NextRequest) {
  try {
    const { award, difficulty, mode, conversationHistory, teamContext } = await req.json()

    console.log('AI Chat API called with:', { award, difficulty, mode, historyLength: conversationHistory?.length })

    if (!award) {
      return NextResponse.json(
        { error: 'Award is required' },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set!')
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const question = await generateInterviewQuestion({
      award,
      difficulty: difficulty || 'standard',
      mode: mode || 'standard',
      conversationHistory: conversationHistory || [],
      teamContext
    })

    console.log('Generated question:', question.substring(0, 100))

    return NextResponse.json({ question })
  } catch (error) {
    console.error('AI chat error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error details:', errorMessage)
    return NextResponse.json(
      { error: `Failed to generate question: ${errorMessage}` },
      { status: 500 }
    )
  }
}
