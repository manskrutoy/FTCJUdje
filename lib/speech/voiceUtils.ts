export class VoiceRecognition {
    private recognition: any
    private isListening: boolean = false

    constructor(
        private onResult: (text: string) => void,
        private onError?: (error: string) => void
    ) {
        if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
            this.recognition = new SpeechRecognition()
            this.recognition.continuous = true
            this.recognition.interimResults = true
            this.recognition.lang = 'en-US'
            this.recognition.maxAlternatives = 1

            this.recognition.onstart = () => {
                this.isListening = true
            }

            this.recognition.onresult = (event: any) => {
                let finalTranscript = ''
                let interimTranscript = ''

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript
                    } else {
                        interimTranscript += transcript
                    }
                }

                if (finalTranscript) {
                    this.onResult(finalTranscript)
                }
            }

            this.recognition.onerror = (event: any) => {
                this.isListening = false
                if (this.onError) {
                    this.onError(event.error)
                }
            }


            this.recognition.onend = () => {
                console.log('Speech recognition ended')
                this.isListening = false

                // Auto-restart if we want continuous listening
                // This prevents the microphone from stopping when user pauses
                if (this.shouldContinue) {
                    console.log('Auto-restarting speech recognition...')
                    setTimeout(() => {
                        if (this.shouldContinue) {
                            this.start()
                        }
                    }, 100)
                }
            }
        }
    }

    private shouldContinue: boolean = false

    start() {
        if (this.recognition && !this.isListening) {
            try {
                this.shouldContinue = true
                this.recognition.start()
                console.log('Speech recognition started')
            } catch (error) {
                console.error('Speech recognition start error:', error)
                this.isListening = false
            }
        }
    }

    stop() {
        console.log('Stopping speech recognition permanently')
        this.shouldContinue = false
        if (this.recognition && this.isListening) {
            try {
                this.recognition.stop()
            } catch (error) {
                console.error('Speech recognition stop error:', error)
            }
            this.isListening = false
        }
    }

    isSupported(): boolean {
        return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    }

    getIsListening(): boolean {
        return this.isListening
    }
}

export function speak(text: string, lang: string = 'en-US'): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
            reject('Text-to-speech not supported')
            return
        }

        // Cancel any ongoing speech first
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang

        // Try to find a better quality voice
        const voices = window.speechSynthesis.getVoices()

        // Prefer Microsoft or Google voices (typically higher quality)
        const preferredVoice = voices.find(voice =>
        (voice.lang.startsWith('en-') &&
            (voice.name.includes('Female') ||
                voice.name.includes('Samantha') ||
                voice.name.includes('Google') ||
                voice.name.includes('Microsoft')))
        ) || voices.find(voice => voice.lang.startsWith('en-'))

        if (preferredVoice) {
            utterance.voice = preferredVoice
        }

        // More natural speech parameters
        utterance.rate = 0.95  // Slightly slower for clarity
        utterance.pitch = 1.1  // Slightly higher pitch for friendliness
        utterance.volume = 0.9 // Slightly quieter to reduce echo

        utterance.onend = () => {
            console.log('AI finished speaking')
            resolve()
        }
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event)
            reject('Speech synthesis failed')
        }

        console.log('AI starting to speak:', text.substring(0, 50))
        window.speechSynthesis.speak(utterance)
    })
}

export function stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
    }
}
