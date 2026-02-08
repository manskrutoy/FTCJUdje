// Coach Mode: Provides guiding questions, not answers

interface CoachHint {
    questionId: string
    hints: string[]
}

const coachHints: CoachHint[] = [
    {
        questionId: 'q3', // Walk us through your engineering process
        hints: [
            'What was your starting point? What problem did you identify first?',
            'How many design iterations did you go through?',
            'What data or tests guided your decisions?',
            'What was the biggest change you made between iterations?',
        ],
    },
    {
        questionId: 'q4', // Biggest engineering challenge
        hints: [
            'What exactly was the problem? Be specific.',
            'What did you try first? Why didn\'t it work?',
            'How did you know your solution worked? What data proved it?',
            'What would you do differently if you faced this again?',
        ],
    },
    {
        questionId: 'q6', // Design iteration that didn\'t work
        hints: [
            'What were you trying to achieve with that iteration?',
            'What specific problem or failure did you encounter?',
            'What did you learn from that failure?',
            'How did that learning influence your next design?',
        ],
    },
    {
        questionId: 'q7', // How do you test your robot?
        hints: [
            'What specific metrics do you measure? (e.g., time, accuracy, consistency)',
            'How many tests do you run before making a decision?',
            'Where do you record your test data?',
            'Can you give an example of a test that led to a design change?',
        ],
    },
    {
        questionId: 'q8', // Why did you choose this robot design?
        hints: [
            'What were your alternatives? Why did you reject them?',
            'What game tasks did you prioritize?',
            'What trade-offs did you make? (e.g., speed vs. stability)',
            'Was there research or inspiration that influenced your design?',
        ],
    },
    {
        questionId: 'q11', // Tell us about your outreach
        hints: [
            'How many students or people did you reach?',
            'How many events or workshops did you hold?',
            'What specific FIRST values did you teach or demonstrate?',
            'What evidence do you have of your impact? (photos, testimonials, numbers)',
        ],
    },
    {
        questionId: 'q12', // How do you measure outreach impact?
        hints: [
            'Do you track numbers? (attendees, participants, teams helped)',
            'Do you collect feedback or testimonials?',
            'Have you seen any long-term results? (e.g., new teams formed, students joining STEM)',
            'How do you know your outreach was effective?',
        ],
    },
    {
        questionId: 'q14', // How does your team make decisions?
        hints: [
            'Do you vote? Discuss? Defer to experts?',
            'Can you give a specific example of a major decision?',
            'How do you ensure everyone\'s voice is heard?',
            'What happens when there\'s disagreement?',
        ],
    },
    {
        questionId: 'q15', // Tell us about a conflict
        hints: [
            'What was the conflict about? Be specific.',
            'Who was involved? How did it affect the team?',
            'What steps did you take to resolve it?',
            'What did your team learn from that experience?',
        ],
    },
    {
        questionId: 'q17', // Example of Gracious Professionalism
        hints: [
            'Can you describe a specific situation or event?',
            'What actions did your team take that demonstrated GP?',
            'How did the other team or person react?',
            'Why was this example important to your team?',
        ],
    },
]

const defaultHints = [
    'Can you provide a specific example?',
    'What data or evidence supports your answer?',
    'How does this relate to your team\'s overall goals?',
    'What was the outcome or result?',
]

export function getCoachHints(questionId: string): string[] {
    const found = coachHints.find(ch => ch.questionId === questionId)
    return found ? found.hints : defaultHints
}
