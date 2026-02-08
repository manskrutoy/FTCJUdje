'use client'

import { useEffect, useState } from 'react'

interface TimerProps {
    duration: number // in seconds
    onComplete: () => void
}

export default function Timer({ duration, onComplete }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete()
            return
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft, onComplete])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    const percentage = (timeLeft / duration) * 100
    let colorClass = 'text-green-600'
    if (percentage < 50 && percentage >= 25) colorClass = 'text-yellow-600'
    else if (percentage < 25) colorClass = 'text-red-600'

    return (
        <div className="text-center">
            <div className={`text-4xl font-bold ${colorClass}`}>
                {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all ${percentage >= 50 ? 'bg-green-500' : percentage >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
