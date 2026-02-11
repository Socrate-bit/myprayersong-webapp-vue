import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
    state: () => ({
        audio: null as HTMLAudioElement | null,
        activeId: null as string | null, // 'hero' | 'preview' | null
        isPlaying: false,
        currentTime: 0,
        duration: 0,
    }),
    actions: {
        init(url: string) {
            if (this.audio) {
                // If the URL is different, we might need to change source, but here it's strictly the same song "Exemple1.mp3".
                // However, to ensure "come back from start" when switching, we might want to reset.
                return
            }

            this.audio = new Audio(url)

            this.audio.addEventListener('loadedmetadata', () => {
                if (this.audio) this.duration = this.audio.duration
            })

            this.audio.addEventListener('timeupdate', () => {
                if (this.audio) this.currentTime = this.audio.currentTime
            })

            this.audio.addEventListener('ended', () => {
                this.isPlaying = false
                this.currentTime = 0
                this.activeId = null
                if (this.audio) this.audio.currentTime = 0
            })

            this.audio.addEventListener('pause', () => {
                this.isPlaying = false
            })

            this.audio.addEventListener('play', () => {
                this.isPlaying = true
            })
        },
        async play(id: string, url: string) {
            this.init(url)

            // If switching players
            if (this.activeId !== id) {
                if (this.audio) {
                    this.audio.currentTime = 0
                    this.currentTime = 0
                }
                this.activeId = id
            }

            try {
                await this.audio?.play()
            } catch (e) {
                console.error('Playback failed', e)
            }
        },
        pause() {
            this.audio?.pause()
        },
        toggle(id: string, url: string) {
            if (this.activeId === id && this.isPlaying) {
                this.pause()
            } else {
                this.play(id, url)
            }
        },
        seek(time: number) {
            if (this.audio) {
                this.audio.currentTime = time
                this.currentTime = time
            }
        }
    }
})
