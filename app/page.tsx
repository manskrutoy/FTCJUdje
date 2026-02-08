import Link from 'next/link'
import { Play, Trophy, CheckCircle, BookOpen, Sparkles, Zap, Target, Users } from 'lucide-react'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float delay-200"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float delay-400"></div>
            </div>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-full px-6 py-2 mb-8 animate-fade-in-down shadow-lg">
                        <Sparkles className="w-5 h-5 text-ftc-orange animate-pulse-slow" />
                        <span className="text-sm font-semibold text-gray-700">AI-Powered Interview Practice</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up leading-tight">
                        Master Your{' '}
                        <span className="gradient-text animate-gradient">Judging Interview</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto animate-fade-in-up delay-100">
                        Practice FTC judging interviews in a safe environment.
                        Get instant feedback. Build confidence. Win awards.
                    </p>

                    <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto animate-fade-in-up delay-200">
                        <strong className="text-ftc-blue">No mentors needed.</strong> Train independently with our interactive simulator,
                        rubric-based scoring, and smart coaching hints.
                    </p>

                    {/* Primary CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
                        <Link
                            href="/simulator"
                            className="group bg-gradient-to-r from-ftc-orange to-orange-600 hover:from-orange-600 hover:to-ftc-orange text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center space-x-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover-glow-orange btn-ripple shine relative overflow-hidden"
                        >
                            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span>Start Mock Judging</span>
                        </Link>

                        <Link
                            href="/awards"
                            className="group glass-strong text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg flex items-center space-x-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover-lift"
                        >
                            <Trophy className="w-6 h-6 text-ftc-orange group-hover:rotate-12 transition-transform" />
                            <span>Explore Awards</span>
                        </Link>
                    </div>

                    {/* Secondary CTA */}
                    <div className="mt-6 animate-fade-in-up delay-400">
                        <Link
                            href="/readiness"
                            className="inline-flex items-center space-x-2 text-ftc-blue hover:text-ftc-blue-light font-semibold transition-colors group"
                        >
                            <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="border-b-2 border-transparent group-hover:border-ftc-blue transition-all">Check Your Readiness</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why <span className="gradient-text">FTC Judge Prep</span>?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to ace your judging interview
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Zap className="w-12 h-12 text-ftc-orange" />}
                        title="Realistic Practice"
                        description="Simulate actual judging interviews with timed sessions and real questions."
                        delay="delay-100"
                    />
                    <FeatureCard
                        icon={<Trophy className="w-12 h-12 text-ftc-orange" />}
                        title="Award-Focused"
                        description="Prepare for specific awards: Inspire, Think, Design, and more."
                        delay="delay-200"
                    />
                    <FeatureCard
                        icon={<Target className="w-12 h-12 text-ftc-orange" />}
                        title="Instant Feedback"
                        description="Get rubric scores and recommendations after every session."
                        delay="delay-300"
                    />
                    <FeatureCard
                        icon={<Users className="w-12 h-12 text-ftc-orange" />}
                        title="Self-Service"
                        description="No mentors required. Learn at your own pace, anytime."
                        delay="delay-400"
                    />
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-gradient-to-br from-white/50 to-purple-50/50 backdrop-blur-sm py-20 relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            How It <span className="gradient-text">Works</span>
                        </h2>
                        <p className="text-xl text-gray-600">Three simple steps to success</p>
                    </div>

                    <div className="space-y-8">
                        <Step
                            number="1"
                            title="Choose Your Focus"
                            description="Select which award you're preparing for and your session duration (5, 10, or 15 minutes)."
                            delay="delay-100"
                        />
                        <Step
                            number="2"
                            title="Practice Your Answers"
                            description="Answer real judging questions. Use Coach Mode if you need hints (we won't give you the answer!)."
                            delay="delay-200"
                        />
                        <Step
                            number="3"
                            title="Get Scored & Improve"
                            description="Receive rubric scores on clarity, evidence, process, teamwork, impact, and award alignment. See exactly what to improve."
                            delay="delay-300"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section - New! */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                    <StatCard number="30+" label="Practice Questions" delay="delay-100" />
                    <StatCard number="7" label="Award Categories" delay="delay-200" />
                    <StatCard number="100%" label="Free Forever" delay="delay-300" />
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
                <div className="glass-strong rounded-3xl p-12 animate-scale-in hover-lift">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Ready to Level Up Your Team?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Start practicing today. It's free, independent, and built for teams just like yours.
                    </p>
                    <Link
                        href="/onboarding"
                        className="inline-block gradient-ftc text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-glow btn-ripple shine"
                    >
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description, delay }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: string;
}) {
    return (
        <div className={`group glass-strong p-8 rounded-2xl hover-lift card-3d animate-fade-in-up ${delay} cursor-pointer`}>
            <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    )
}

function Step({ number, title, description, delay }: {
    number: string;
    title: string;
    description: string;
    delay: string;
}) {
    return (
        <div className={`flex items-start space-x-6 glass p-6 rounded-2xl hover-lift animate-slide-in-left ${delay}`}>
            <div className="flex-shrink-0 w-16 h-16 gradient-ftc text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg animate-pulse-slow">
                {number}
            </div>
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
            </div>
        </div>
    )
}

function StatCard({ number, label, delay }: {
    number: string;
    label: string;
    delay: string;
}) {
    return (
        <div className={`glass-strong p-8 rounded-2xl text-center hover-lift animate-scale-in ${delay}`}>
            <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">{number}</div>
            <div className="text-gray-600 text-lg font-semibold">{label}</div>
        </div>
    )
}
