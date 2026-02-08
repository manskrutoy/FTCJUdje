import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!
})

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface InterviewContext {
  award: string
  teamName?: string
  teamContext?: string
  conversationHistory: Message[]
}

const JUDGE_SYSTEM_PROMPTS = {
  inspire: `You are an experienced FIRST Tech Challenge judge conducting an Inspire Award interview.

The Inspire Award celebrates comprehensive excellence - a team that embodies FIRST values and excels in all areas.

Your role:
- Ask thoughtful questions about robot design, engineering process, outreach, and team culture
- Probe for specific evidence, data, and measurable outcomes
- Be encouraging but professional
- Ask follow-up questions based on their answers
- Keep questions concise (1-2 sentences)

Interview flow:
1. Start with: "Tell us about your team and what makes you proud this season."
2. Ask 4-6 questions covering: robot design, engineering process, community impact, and team collaboration
3. End with: "Thank you! Do you have any questions for us?"

Guidelines:
- If answer is vague, ask: "Can you give me a specific example?"
- If they mention data, ask: "How did you measure that?"
- If they mention a problem, ask: "What did you learn from that?"
- Avoid yes/no questions`,

  think: `You are an experienced FIRST Tech Challenge judge conducting a Think Award interview.

The Think Award honors teams with innovative robot designs and effective engineering practices.

Your role:
- Focus on robot design decisions, CAD, prototyping, and testing
- Ask about design trade-offs and problem-solving
- Probe for engineering process documentation
- Keep questions concise and specific

Key areas to explore:
- Design iterations and why they made changes
- Testing methodology and data collection
- CAD and simulation usage
- Innovative solutions to game challenges`,

  design: `You are an experienced FIRST Tech Challenge judge conducting a Design Award interview.

The Design Award recognizes elegant, efficient robot designs with clear documentation.

Your role:
- Focus on industrial design principles and aesthetics
- Ask about form, function, and manufacturability
- Probe for CAD documentation and design rationale
- Keep questions concise

Key areas:
- Design process from concept to final robot
- Drawings, CAD models, and documentation
- Safety, robustness, and elegance
- Design decisions and trade-offs`
}

function getSystemPrompt(award: string): string {
  const normalizedAward = award.toLowerCase()
  return JUDGE_SYSTEM_PROMPTS[normalizedAward as keyof typeof JUDGE_SYSTEM_PROMPTS] 
    || JUDGE_SYSTEM_PROMPTS.inspire
}

function buildMessages(context: InterviewContext): Message[] {
  const systemPrompt = getSystemPrompt(context.award)
  
  const messages: Message[] = [
    { role: 'system', content: systemPrompt }
  ]

  // Add team context if provided
  if (context.teamContext) {
    messages.push({
      role: 'system',
      content: `Team context: ${context.teamContext}`
    })
  }

  // Add conversation history
  messages.push(...context.conversationHistory)

  return messages
}

export async function generateInterviewQuestion(
  context: InterviewContext
): Promise<string> {
  const messages = buildMessages(context)
  
  try {
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
    })
    
    return completion.choices[0]?.message?.content || 'Tell us more about your team.'
  } catch (error) {
    console.error('Groq API error:', error)
    return 'Can you tell us about your engineering process?'
  }
}

export async function streamInterviewQuestion(
  context: InterviewContext,
  onChunk: (text: string) => void
): Promise<void> {
  const messages = buildMessages(context)
  
  try {
    const stream = await groq.chat.completions.create({
      messages,
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 150,
      stream: true,
    })
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      if (content) {
        onChunk(content)
      }
    }
  } catch (error) {
    console.error('Groq streaming error:', error)
    onChunk('Can you elaborate on that?')
  }
}

export async function analyzeAnswer(
  question: string,
  answer: string,
  award: string
): Promise<{ feedback: string; suggestions: string[] }> {
  const messages: Message[] = [
    {
      role: 'system',
      content: `You are an FTC judge providing quick feedback on interview answers. 
      Focus on what's good and what could be improved. Be encouraging but honest.
      Keep feedback to 2-3 sentences max.`
    },
    {
      role: 'user',
      content: `Question: "${question}"\nAnswer: "${answer}"\nAward: ${award}\n\nProvide brief feedback.`
    }
  ]

  try {
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama3-70b-8192',
      temperature: 0.5,
      max_tokens: 100,
    })

    const feedback = completion.choices[0]?.message?.content || 'Good answer!'
    
    return {
      feedback,
      suggestions: [
        'Add specific data or numbers',
        'Explain the process you followed',
        'Share what you learned'
      ]
    }
  } catch (error) {
    console.error('Analysis error:', error)
    return {
      feedback: 'Keep practicing!',
      suggestions: []
    }
  }
}
