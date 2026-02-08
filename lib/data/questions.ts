export interface Question {
    id: string
    text: string
    category: 'process' | 'impact' | 'teamwork' | 'innovation' | 'general'
    awards: string[]
    difficulty: 'easy' | 'medium' | 'hard'
}

export const questions: Question[] = [
    // General / Inspire
    {
        id: 'q1',
        text: 'Tell us about your team. What makes you unique?',
        category: 'general',
        awards: ['inspire', 'think', 'design'],
        difficulty: 'easy',
    },
    {
        id: 'q2',
        text: 'What are you most proud of this season?',
        category: 'general',
        awards: ['inspire'],
        difficulty: 'easy',
    },

    // Engineering Process / Think
    {
        id: 'q3',
        text: 'Walk us through your engineering process this season.',
        category: 'process',
        awards: ['think', 'inspire'],
        difficulty: 'medium',
    },
    {
        id: 'q4',
        text: 'What was your biggest engineering challenge, and how did you solve it?',
        category: 'process',
        awards: ['think', 'design', 'inspire'],
        difficulty: 'medium',
    },
    {
        id: 'q5',
        text: 'How do you document your engineering work?',
        category: 'process',
        awards: ['think'],
        difficulty: 'easy',
    },
    {
        id: 'q6',
        text: 'Tell us about a design iteration that didn\'t work. What did you learn?',
        category: 'process',
        awards: ['think', 'design'],
        difficulty: 'medium',
    },
    {
        id: 'q7',
        text: 'How do you test your robot? What data do you collect?',
        category: 'process',
        awards: ['think', 'design'],
        difficulty: 'medium',
    },

    // Design
    {
        id: 'q8',
        text: 'Why did you choose this robot design?',
        category: 'innovation',
        awards: ['design', 'think'],
        difficulty: 'medium',
    },
    {
        id: 'q9',
        text: 'What is the most innovative part of your robot?',
        category: 'innovation',
        awards: ['design', 'inspire'],
        difficulty: 'medium',
    },
    {
        id: 'q10',
        text: 'How did you prototype your mechanisms before building the final robot?',
        category: 'process',
        awards: ['design'],
        difficulty: 'hard',
    },

    // Outreach / Impact
    {
        id: 'q11',
        text: 'Tell us about your outreach activities this season.',
        category: 'impact',
        awards: ['inspire'],
        difficulty: 'easy',
    },
    {
        id: 'q12',
        text: 'How do you measure the impact of your outreach?',
        category: 'impact',
        awards: ['inspire'],
        difficulty: 'hard',
    },
    {
        id: 'q13',
        text: 'How does your team spread FIRST values in your community?',
        category: 'impact',
        awards: ['inspire'],
        difficulty: 'medium',
    },

    // Teamwork
    {
        id: 'q14',
        text: 'How does your team make decisions?',
        category: 'teamwork',
        awards: ['inspire'],
        difficulty: 'medium',
    },
    {
        id: 'q15',
        text: 'Tell us about a conflict your team faced and how you resolved it.',
        category: 'teamwork',
        awards: ['inspire'],
        difficulty: 'hard',
    },
    {
        id: 'q16',
        text: 'How do you ensure everyone on the team is involved?',
        category: 'teamwork',
        awards: ['inspire'],
        difficulty: 'medium',
    },
    {
        id: 'q17',
        text: 'Give us an example of Gracious Professionalism from your team.',
        category: 'teamwork',
        awards: ['inspire'],
        difficulty: 'medium',
    },

    // Strategy & Planning
    {
        id: 'q18',
        text: 'How did you decide which game tasks to prioritize?',
        category: 'process',
        awards: ['think', 'design'],
        difficulty: 'medium',
    },
    {
        id: 'q19',
        text: 'How do you manage your timeline and deadlines?',
        category: 'teamwork',
        awards: ['think', 'inspire'],
        difficulty: 'easy',
    },

    // Specific Technical
    {
        id: 'q20',
        text: 'What sensors does your robot use, and why?',
        category: 'innovation',
        awards: ['design', 'think'],
        difficulty: 'medium',
    },
    {
        id: 'q21',
        text: 'How does your autonomous program work?',
        category: 'innovation',
        awards: ['think', 'design'],
        difficulty: 'hard',
    },
    {
        id: 'q22',
        text: 'What trade-offs did you make in your robot design?',
        category: 'process',
        awards: ['design', 'think'],
        difficulty: 'hard',
    },

    // Sustainability & Future
    {
        id: 'q23',
        text: 'How is your team sustainable? How will you pass knowledge to new members?',
        category: 'teamwork',
        awards: ['inspire'],
        difficulty: 'medium',
    },
    {
        id: 'q24',
        text: 'What would you do differently if you started the season over?',
        category: 'general',
        awards: ['inspire', 'think'],
        difficulty: 'medium',
    },

    // Collaboration
    {
        id: 'q25',
        text: 'Have you helped other teams this season? How?',
        category: 'teamwork',
        awards: ['inspire'],
        difficulty: 'easy',
    },
    {
        id: 'q26',
        text: 'What resources or mentors helped your team this year?',
        category: 'teamwork',
        awards: ['inspire'],
        difficulty: 'easy',
    },

    // Learning
    {
        id: 'q27',
        text: 'What did you personally learn this season?',
        category: 'general',
        awards: ['inspire'],
        difficulty: 'easy',
    },
    {
        id: 'q28',
        text: 'What skills did team members develop this season?',
        category: 'teamwork',
        awards: ['inspire'],
        difficulty: 'medium',
    },

    // Unique / Deeper
    {
        id: 'q29',
        text: 'If you could give advice to a rookie team, what would it be?',
        category: 'general',
        awards: ['inspire'],
        difficulty: 'easy',
    },
    {
        id: 'q30',
        text: 'Why does FIRST matter to your team?',
        category: 'general',
        awards: ['inspire'],
        difficulty: 'medium',
    },
]

export function getQuestionsByAward(awardId: string): Question[] {
    return questions.filter(q => q.awards.includes(awardId))
}

export function getQuestionsForSession(awardId: string, count: number): Question[] {
    const relevant = getQuestionsByAward(awardId)
    // Shuffle and take `count` questions
    const shuffled = [...relevant].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}
