interface Answer {
    questionId: string
    questionText: string
    answerText: string
}

export interface RubricScore {
    category: 'clarity' | 'evidence' | 'process' | 'teamwork' | 'impact' | 'alignment'
    score: number // 0-4
    feedback: string
}

export interface FeedbackReport {
    scores: RubricScore[]
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
}

// Keywords for scoring
const evidenceKeywords = ['test', 'data', 'measured', 'result', 'metric', 'percent', '%', 'number', 'increase', 'decrease', 'improved', 'performance']
const processKeywords = ['iteration', 'prototype', 'design', 'problem', 'solution', 'challenge', 'changed', 'modified', 'learned', 'failed', 'tried']
const teamworkKeywords = ['team', 'together', 'collaborated', 'worked with', 'our', 'we', 'member', 'role', 'shared']
const impactKeywords = ['community', 'outreach', 'students', 'taught', 'helped', 'reached', 'event', 'workshop', 'impact', 'spread']

function scoreClarity(answer: string): { score: number; feedback: string } {
    const length = answer.trim().length
    const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 0).length

    if (length < 50) {
        return { score: 1, feedback: 'Answer is too brief. Provide more detail and examples.' }
    }
    if (length < 150) {
        return { score: 2, feedback: 'Answer is somewhat clear but could use more structure and detail.' }
    }
    if (sentences >= 3 && length >= 150) {
        return { score: 4, feedback: 'Answer is clear, well-structured, and detailed.' }
    }
    return { score: 3, feedback: 'Answer is clear with good detail. Consider adding more specific examples.' }
}

function scoreEvidence(answer: string): { score: number; feedback: string } {
    const lowerAnswer = answer.toLowerCase()
    const evidenceCount = evidenceKeywords.filter(kw => lowerAnswer.includes(kw)).length
    const hasNumbers = /\d+/.test(answer)

    if (evidenceCount === 0 && !hasNumbers) {
        return { score: 1, feedback: 'No specific evidence or data mentioned. Add metrics, test results, or concrete examples.' }
    }
    if (evidenceCount === 1 || hasNumbers) {
        return { score: 2, feedback: 'Some evidence provided. Include more specific data or test results.' }
    }
    if (evidenceCount >= 2 && hasNumbers) {
        return { score: 4, feedback: 'Excellent use of evidence and data. Your answer is well-supported.' }
    }
    return { score: 3, feedback: 'Good evidence. Consider adding more quantitative data.' }
}

function scoreProcess(answer: string): { score: number; feedback: string } {
    const lowerAnswer = answer.toLowerCase()
    const processCount = processKeywords.filter(kw => lowerAnswer.includes(kw)).length

    if (processCount === 0) {
        return { score: 1, feedback: 'No engineering process described. Explain your design iterations and problem-solving.' }
    }
    if (processCount === 1) {
        return { score: 2, feedback: 'Some process mentioned. Describe more iterations, challenges, and learnings.' }
    }
    if (processCount >= 3) {
        return { score: 4, feedback: 'Strong description of engineering process with iterations and learning.' }
    }
    return { score: 3, feedback: 'Good process description. Add more detail about specific challenges.' }
}

function scoreTeamwork(answer: string): { score: number; feedback: string } {
    const lowerAnswer = answer.toLowerCase()
    const teamworkCount = teamworkKeywords.filter(kw => lowerAnswer.includes(kw)).length

    if (teamworkCount === 0) {
        return { score: 1, feedback: 'No team collaboration mentioned. Judges want to hear about teamwork.' }
    }
    if (teamworkCount === 1) {
        return { score: 2, feedback: 'Team mentioned but not emphasized. Describe specific collaborative efforts.' }
    }
    if (teamworkCount >= 3) {
        return { score: 4, feedback: 'Excellent emphasis on team collaboration and roles.' }
    }
    return { score: 3, feedback: 'Good teamwork mentioned. Add specific examples of collaboration.' }
}

function scoreImpact(answer: string): { score: number; feedback: string } {
    const lowerAnswer = answer.toLowerCase()
    const impactCount = impactKeywords.filter(kw => lowerAnswer.includes(kw)).length
    const hasNumbers = /\d+\s*(students|people|teams|events)/.test(lowerAnswer)

    if (impactCount === 0) {
        return { score: 1, feedback: 'No community impact or outreach mentioned.' }
    }
    if (impactCount >= 1 && hasNumbers) {
        return { score: 4, feedback: 'Excellent description of measurable community impact.' }
    }
    if (impactCount >= 2) {
        return { score: 3, feedback: 'Good impact mentioned. Quantify the reach (e.g., number of students).' }
    }
    return { score: 2, feedback: 'Some impact mentioned. Add more details and measurable outcomes.' }
}

function scoreAlignment(answer: string, award: string): { score: number; feedback: string } {
    // Simple award-specific alignment check
    const lowerAnswer = answer.toLowerCase()

    if (award === 'think') {
        const hasEngineering = processKeywords.some(kw => lowerAnswer.includes(kw))
        const hasData = evidenceKeywords.some(kw => lowerAnswer.includes(kw))
        if (hasEngineering && hasData) return { score: 4, feedback: 'Answer aligns well with Think Award focus on engineering.' }
        if (hasEngineering || hasData) return { score: 3, feedback: 'Good engineering focus. Add more technical details.' }
        return { score: 2, feedback: 'Not enough engineering process for Think Award. Describe iterations and data.' }
    }

    if (award === 'design') {
        const hasDesign = lowerAnswer.includes('design') || lowerAnswer.includes('cad') || lowerAnswer.includes('prototype')
        if (hasDesign) return { score: 4, feedback: 'Answer aligns well with Design Award focus.' }
        return { score: 2, feedback: 'For Design Award, emphasize design decisions, CAD, and prototyping.' }
    }

    if (award === 'inspire') {
        const evidenceCount = evidenceKeywords.filter(kw => lowerAnswer.includes(kw)).length
        const processCount = processKeywords.filter(kw => lowerAnswer.includes(kw)).length
        const teamworkCount = teamworkKeywords.filter(kw => lowerAnswer.includes(kw)).length
        const impactCount = impactKeywords.filter(kw => lowerAnswer.includes(kw)).length
        const balanced = [evidenceCount > 0, processCount > 0, teamworkCount > 0, impactCount > 0].filter(Boolean).length
        if (balanced >= 3) return { score: 4, feedback: 'Balanced answer covering multiple aspects—perfect for Inspire Award.' }
        if (balanced >= 2) return { score: 3, feedback: 'Good coverage. Inspire Award judges want to see excellence in all areas.' }
        return { score: 2, feedback: 'Inspire Award requires comprehensive excellence. Cover engineering, teamwork, and impact.' }
    }

    return { score: 3, feedback: 'Answer is relevant to the award.' }
}

export function calculateRubricScores(answers: Answer[], award: string): FeedbackReport {
    // Combine all answers into one text for overall scoring
    const combinedText = answers.map(a => a.answerText).join(' ')

    const clarity = scoreClarity(combinedText)
    const evidence = scoreEvidence(combinedText)
    const process = scoreProcess(combinedText)
    const teamwork = scoreTeamwork(combinedText)
    const impact = scoreImpact(combinedText)
    const alignment = scoreAlignment(combinedText, award)

    const scores: RubricScore[] = [
        { category: 'clarity', ...clarity },
        { category: 'evidence', ...evidence },
        { category: 'process', ...process },
        { category: 'teamwork', ...teamwork },
        { category: 'impact', ...impact },
        { category: 'alignment', ...alignment },
    ]

    // Generate feedback
    const strengths: string[] = []
    const weaknesses: string[] = []
    const recommendations: string[] = []

    scores.forEach(s => {
        if (s.score >= 4) strengths.push(s.feedback)
        if (s.score <= 2) weaknesses.push(s.feedback)
    })

    // Add specific recommendations based on scores
    if (evidence.score <= 2) {
        recommendations.push('Add specific test data and metrics to your Engineering Notebook.')
    }
    if (process.score <= 2) {
        recommendations.push('Document your design iterations with dates, changes, and reasons.')
    }
    if (teamwork.score <= 2) {
        recommendations.push('Highlight specific team roles and collaborative efforts.')
    }
    if (impact.score <= 2) {
        recommendations.push('Quantify your outreach impact (e.g., "We taught 150 students at 5 workshops").')
    }
    if (clarity.score <= 2) {
        recommendations.push('Practice structuring answers: Problem → Action → Result.')
    }

    if (recommendations.length === 0) {
        recommendations.push('Great work! Keep practicing to maintain consistency under pressure.')
    }

    return {
        scores,
        strengths: strengths.length > 0 ? strengths : ['You provided detailed responses.'],
        weaknesses: weaknesses.length > 0 ? weaknesses : ['Minor improvements possible—see recommendations.'],
        recommendations,
    }
}
