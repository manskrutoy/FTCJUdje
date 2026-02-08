import Link from 'next/link'
import { Play, Trophy, CheckCircle, BookOpen } from 'lucide-react'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Master Your{' '}
                        <span className="text-ftc-orange">Judging Interview</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Practice FTC judging interviews in a safe environment.
                        Get instant feedback. Build confidence. Win awards.
                    </p>
                    <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                        <strong className="text-ftc-blue">No mentors needed.</strong> Train independently with our interactive simulator,
                        rubric-based scoring, and smart coaching hints.
                    </p>

                    {/* Primary CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/simulator"
                            className="bg-ftc-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-all hover:scale-105 shadow-lg"
                        >
                            <Play className="w-6 h-6" />
                            <span>Start Mock Judging</span>
                        </Link>
                        <Link
                            href="/awards"
                            className="bg-ftc-blue hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-all hover:scale-105 shadow-lg"
                        >
                            <Trophy className="w-6 h-6" />
                            <span>Explore Awards</span>
                        </Link>
                        <Link
                            href="/readiness"
                            className="bg-white hover:bg-gray-50 text-ftc-blue border-2 border-ftc-blue px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-all hover:scale-105"
                        >
                            <CheckCircle className="w-6 h-6" />
                            <span>Check Readiness</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Why FTC Judge Prep?
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Play className="w-12 h-12 text-ftc-orange" />}
                        title="Realistic Practice"
                        description="Simulate actual judging interviews with timed sessions and real questions."
                    />
                    <FeatureCard
                        icon={<Trophy className="w-12 h-12 text-ftc-orange" />}
                        title="Award-Focused"
                        description="Prepare for specific awards: Inspire, Think, Design, and more."
                    />
                    <FeatureCard
                        icon={<CheckCircle className="w-12 h-12 text-ftc-orange" />}
                        title="Instant Feedback"
                        description="Get rubric scores and recommendations after every session."
                    />
                    <FeatureCard
                        icon={<BookOpen className="w-12 h-12 text-ftc-orange" />}
                        title="Self-Service"
                        description="No mentors required. Learn at your own pace, anytime."
                    />
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        How It Works
                    </h2>
                    <div className="space-y-8">
                        <Step
                            number="1"
                            title="Choose Your Focus"
                            description="Select which award you're preparing for and your session duration (5, 10, or 15 minutes)."
                        />
                        <Step
                            number="2"
                            title="Practice Your Answers"
                            description="Answer real judging questions. Use Coach Mode if you need hints (we won't give you the answer!)."
                        />
                        <Step
                            number="3"
                            title="Get Scored & Improve"
                            description="Receive rubric scores on clarity, evidence, process, teamwork, impact, and award alignment. See exactly what to improve."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Ready to Level Up Your Team?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    Start practicing today. It's free, independent, and built for teams just like yours.
                </p>
                <Link
                    href="/onboarding"
                    className="inline-block bg-ftc-orange hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold text-xl transition-all hover:scale-105 shadow-lg"
                >
                    Get Started Now
                </Link>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-ftc-orange text-white rounded-full flex items-center justify-center text-xl font-bold">
                {number}
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    )
}
