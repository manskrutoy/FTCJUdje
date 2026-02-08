import { NextRequest, NextResponse } from 'next/server'
import { generateInterviewQuestion, type Message, type DifficultyLevel, type InterviewMode } from '@/lib/ai/judgePrompts'

export async function POST(req: NextRequest) {
  try {
    const { award, difficulty, mode, conversationHistory, teamContext } = await req.json()

    if (!award) {
      return NextResponse.json(
        { error: 'Award is required' },
        { status: 400 }
      )
    }

    const question = await generateInterviewQuestion({
      award,
      difficulty: difficulty || 'standard',
      mode: mode || 'standard',
      conversationHistory: conversationHistory || [],
      teamContext
    })

    return NextResponse.json({ question })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate question' },
      { status: 500 }
    )
  }
}
