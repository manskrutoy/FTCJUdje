import Link from 'next/link'
import { awards } from '@/lib/data/awards'
import { Trophy, ArrowRight } from 'lucide-react'

export default function AwardsHub() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">FTC Awards Hub</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn what judges are looking for in each award. Prepare strategically with checklists, examples, and focused practice.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {awards.map((award) => (
                        <AwardCard key={award.id} award={award} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function AwardCard({ award }: { award: { id: string; name: string; description: string } }) {
    const colors: Record<string, string> = {
        inspire: 'bg-gradient-to-br from-amber-400 to-orange-500',
        think: 'bg-gradient-to-br from-blue-400 to-blue-600',
        design: 'bg-gradient-to-br from-purple-400 to-purple-600',
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className={`${colors[award.id]} p-6`}>
                <Trophy className="w-12 h-12 text-white mb-2" />
                <h2 className="text-2xl font-bold text-white">{award.name}</h2>
            </div>
            <div className="p-6">
                <p className="text-gray-600 mb-6">{award.description}</p>
                <Link
                    href={`/awards/${award.id}`}
                    className="inline-flex items-center space-x-2 text-ftc-orange hover:text-orange-600 font-semibold"
                >
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    )
}
