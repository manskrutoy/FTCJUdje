'use client'

import { BookOpen } from 'lucide-react'

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <BookOpen className="w-16 h-16 text-ftc-orange mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources & Templates</h1>
                    <p className="text-xl text-gray-600">
                        Tools and strategies to help you structure your answers and improve your judging performance
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Answer Structures */}
                    <Section title="Answer Structure Templates">
                        <StructureCard
                            name="STAR Method"
                            description="Situation → Task → Action → Result"
                            example="Situation: Our intake mechanism was inconsistent. Task: We needed 90%+ reliability. Action: We tested 3 designs with 20 trials each. Result: Final design achieved 95% success rate."
                        />
                        <StructureCard
                            name="Problem → Action → Result"
                            description="State the problem, explain your solution, show measurable outcomes"
                            example="Problem: Robot was too slow (30 sec cycle time). Action: We optimized gear ratio from 1:3 to 1:5. Result: Cycle time reduced to 18 seconds, 40% improvement."
                        />
                        <StructureCard
                            name="Before → After"
                            description="Show transformation with specific metrics"
                            example="Before our outreach program, only 2 FTC teams existed in our region. After 2 years of workshops, we now have 8 active teams."
                        />
                    </Section>

                    {/* Common Questions */}
                    <Section title="30 Common Judging Questions">
                        <div className="grid md:grid-cols-2 gap-4">
                            {commonQuestions.map((q, idx) => (
                                <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-ftc-orange">
                                    <span className="text-ftc-orange font-semibold">{q.category}:</span>
                                    <p className="text-gray-700 mt-1">{q.text}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Time Management */}
                    <Section title="Time Management Tips">
                        <ul className="space-y-3">
                            <TipItem text="1-minute answer = 150-200 words. Practice condensing your story." />
                            <TipItem text="Use the 'headline first' approach: state your main point, then add details." />
                            <TipItem text="If a judge interrupts, it's a GOOD sign—they're engaged. Answer their follow-up." />
                            <TipItem text="Allocate time: 40% problem/context, 40% solution/action, 20% result/impact." />
                        </ul>
                    </Section>

                    {/* What If I Don't Know */}
                    <Section title="What If I Don't Know the Answer?">
                        <ul className="space-y-3">
                            <TipItem text="Never say &quot;I don't know&quot; alone. Add: &quot;...but I can tell you about [related topic].&quot;" />
                            <TipItem text="&quot;That's a great question. What I can share is...&quot; then pivot to what you DO know." />
                            <TipItem text="&quot;[Teammate name] worked on that part. Can they answer?&quot; (Teamwork bonus!)" />
                            <TipItem text="Honesty is okay: &quot;We haven't explored that yet, but it's on our list for next season.&quot;" />
                        </ul>
                    </Section>

                    {/* Filler Words */}
                    <Section title="Avoiding Filler Words">
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
                            <p className="text-red-800 font-semibold">Common fillers to avoid:</p>
                            <p className="text-red-700">"Um," "uh," "like," "basically," "you know," "so yeah," "kind of"</p>
                        </div>
                        <ul className="space-y-3">
                            <TipItem text="Replace fillers with brief pauses. Silence is better than 'um.'" />
                            <TipItem text="Practice recording yourself. Count your fillers per minute." />
                            <TipItem text='Use transition phrases: "Additionally," "For example," "As a result"' />
                        </ul>
                    </Section>

                    {/* Metrics Library */}
                    <Section title="Metrics Library (Examples to Track)">
                        <div className="grid md:grid-cols-3 gap-4">
                            <MetricCard
                                title="Robot Performance"
                                metrics={['Cycle time (seconds)', 'Accuracy (%)', 'Speed (m/s)', 'Test count', 'Success rate (%)']}
                            />
                            <MetricCard
                                title="Outreach Impact"
                                metrics={['Students reached (#)', 'Events held (#)', 'Teams helped (#)', 'Workshop hours', 'Volunteers (#)']}
                            />
                            <MetricCard
                                title="Engineering Process"
                                metrics={['Design iterations (#)', 'Tests per iteration', 'Build hours', 'Problems solved', 'Improvements (%)']}
                            />
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            {children}
        </div>
    )
}

function StructureCard({ name, description, example }: { name: string; description: string; example: string }) {
    return (
        <div className="mb-6 last:mb-0">
            <h3 className="font-bold text-ftc-blue text-lg mb-2">{name}</h3>
            <p className="text-gray-600 mb-2">{description}</p>
            <div className="bg-gray-50 border-l-4 border-ftc-orange p-4 rounded">
                <p className="text-gray-700 italic">"{example}"</p>
            </div>
        </div>
    )
}

function TipItem({ text }: { text: string }) {
    return (
        <li className="flex items-start space-x-2">
            <span className="text-ftc-orange font-bold flex-shrink-0">•</span>
            <span className="text-gray-700">{text}</span>
        </li>
    )
}

function MetricCard({ title, metrics }: { title: string; metrics: string[] }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
            <ul className="space-y-1">
                {metrics.map((m, idx) => (
                    <li key={idx} className="text-sm text-gray-700">• {m}</li>
                ))}
            </ul>
        </div>
    )
}

const commonQuestions = [
    { category: 'General', text: 'Tell us about your team.' },
    { category: 'General', text: 'What makes you unique?' },
    { category: 'Process', text: 'Walk us through your engineering process.' },
    { category: 'Process', text: 'What was your biggest challenge?' },
    { category: 'Design', text: 'Why did you choose this robot design?' },
    { category: 'Design', text: 'What trade-offs did you make?' },
    { category: 'Process', text: 'Tell us about a failure and what you learned.' },
    { category: 'Process', text: 'How do you test your robot?' },
    { category: 'Teamwork', text: 'How does your team make decisions?' },
    { category: 'Teamwork', text: 'Tell us about a conflict you resolved.' },
    { category: 'Impact', text: 'Describe your outreach activities.' },
    { category: 'Impact', text: 'How do you measure outreach impact?' },
    { category: 'Innovation', text: 'What is the most innovative part of your robot?' },
    { category: 'Innovation', text: 'What sensors does your robot use?' },
    { category: 'Collaboration', text: 'Give an example of Gracious Professionalism.' },
    { category: 'Collaboration', text: 'Have you helped other teams?' },
]
