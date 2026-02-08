export interface ReadinessQuestion {
    id: string
    text: string
    category: 'evidence' | 'process' | 'impact' | 'practice'
    options: {
        text: string
        score: number // 0-10 points
    }[]
}

export const readinessQuiz: ReadinessQuestion[] = [
    {
        id: 'r1',
        text: 'Do you have documented test results for your robot in your Engineering Notebook?',
        category: 'evidence',
        options: [
            { text: 'Yes, with multiple tests, data, and charts', score: 10 },
            { text: 'Yes, but limited data', score: 6 },
            { text: 'Some documentation, but incomplete', score: 3 },
            { text: 'No test results documented', score: 0 },
        ],
    },
    {
        id: 'r2',
        text: 'Can you quantify your community outreach impact?',
        category: 'impact',
        options: [
            { text: 'Yes, with numbers (students reached, events held, etc.)', score: 10 },
            { text: 'Somewhat, but vague estimates', score: 5 },
            { text: 'No, we don\'t track numbers', score: 0 },
        ],
    },
    {
        id: 'r3',
        text: 'How many design iterations did your team go through this season?',
        category: 'process',
        options: [
            { text: '5+ iterations with documented changes', score: 10 },
            { text: '3-4 iterations', score: 7 },
            { text: '1-2 iterations', score: 4 },
            { text: 'No formal iterations', score: 0 },
        ],
    },
    {
        id: 'r4',
        text: 'Have you practiced answering judging questions under time pressure?',
        category: 'practice',
        options: [
            { text: 'Multiple practice sessions', score: 10 },
            { text: 'Once or twice', score: 5 },
            { text: 'Not yet', score: 0 },
        ],
    },
    {
        id: 'r5',
        text: 'Do you have specific examples of team collaboration and conflict resolution?',
        category: 'process',
        options: [
            { text: 'Yes, multiple concrete examples', score: 10 },
            { text: 'One or two examples', score: 6 },
            { text: 'General statements, no specific examples', score: 2 },
            { text: 'Haven\'t thought about this', score: 0 },
        ],
    },
    {
        id: 'r6',
        text: 'Can you explain why you made each major design decision?',
        category: 'process',
        options: [
            { text: 'Yes, with trade-offs and data', score: 10 },
            { text: 'Yes, but mostly intuition', score: 5 },
            { text: 'No, we just built what seemed right', score: 0 },
        ],
    },
    {
        id: 'r7',
        text: 'Do you have evidence of Gracious Professionalism?',
        category: 'impact',
        options: [
            { text: 'Yes, specific stories and examples', score: 10 },
            { text: 'General understanding, no specific examples', score: 4 },
            { text: 'Not sure what this means', score: 0 },
        ],
    },
    {
        id: 'r8',
        text: 'How detailed is your Engineering Notebook?',
        category: 'evidence',
        options: [
            { text: 'Very detailed: dates, photos, data, iterations', score: 10 },
            { text: 'Somewhat detailed, but gaps', score: 6 },
            { text: 'Minimal documentation', score: 2 },
            { text: 'No notebook or almost empty', score: 0 },
        ],
    },
    {
        id: 'r9',
        text: 'Can all team members answer questions about the robot and team?',
        category: 'practice',
        options: [
            { text: 'Yes, everyone is prepared', score: 10 },
            { text: 'Most members are prepared', score: 7 },
            { text: 'Only 1-2 members can answer', score: 3 },
            { text: 'We haven\'t discussed this', score: 0 },
        ],
    },
    {
        id: 'r10',
        text: 'Do you have a plan for team sustainability (passing knowledge to new members)?',
        category: 'process',
        options: [
            { text: 'Yes, documented processes and mentoring plan', score: 10 },
            { text: 'Some ideas, not formalized', score: 5 },
            { text: 'No plan yet', score: 0 },
        ],
    },
]

export function calculateReadinessScore(answers: Record<string, number>): {
    totalScore: number
    percentage: number
    categoryScores: Record<string, { score: number; max: number }>
} {
    const maxScore = readinessQuiz.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0)
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const percentage = Math.round((totalScore / maxScore) * 100)

    const categoryScores: Record<string, { score: number; max: number }> = {}

    readinessQuiz.forEach((q) => {
        if (!categoryScores[q.category]) {
            categoryScores[q.category] = { score: 0, max: 0 }
        }
        categoryScores[q.category].max += Math.max(...q.options.map(o => o.score))
        categoryScores[q.category].score += answers[q.id] || 0
    })

    return { totalScore, percentage, categoryScores }
}

export function getActionPlan(percentage: number, days: number): string[] {
    const plans: Record<number, string[]> = {
        3: [
            'Day 1: Review your Engineering Notebook and add missing test data',
            'Day 2: Practice one 10-minute mock interview',
            'Day 3: Final team review and cheat sheet creation',
        ],
        7: [
            'Day 1-2: Complete Engineering Notebook with all test results and iterations',
            'Day 3-4: Practice 3 mock interviews focusing on weak areas',
            'Day 5: Quantify outreach impact and gather evidence',
            'Day 6: Full 15-minute team mock interview',
            'Day 7: Create team cheat sheet and final review',
        ],
        14: [
            'Week 1 - Days 1-3: Document all design iterations and test data in notebook',
            'Week 1 - Days 4-5: Gather outreach evidence (photos, numbers, testimonials)',
            'Week 1 - Day 6: First team mock interview (identify gaps)',
            'Week 1 - Day 7: Fill identified gaps in documentation',
            'Week 2 - Days 8-10: Practice 5 mock interviews (different awards)',
            'Week 2 - Day 11: Prepare specific examples for all categories',
            'Week 2 - Day 12: Final full-length mock interview',
            'Week 2 - Days 13-14: Create cheat sheet, review common mistakes',
        ],
    }

    return plans[days] || plans[7]
}
