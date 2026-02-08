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
                this.isListening = false
            }
        }
    }

    start() {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start()
            } catch (error) {
                console.error('Speech recognition start error:', error)
                this.isListening = false
            }
        }
    }

    stop() {
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

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.rate = 0.9
        utterance.pitch = 1.0
        utterance.volume = 1.0

        utterance.onend = () => resolve()
        utterance.onerror = () => reject('Speech synthesis failed')

        window.speechSynthesis.speak(utterance)
    })
}

export function stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
    }
}
