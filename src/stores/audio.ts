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
                if (this.audio.src.includes(url)) {
                    return
                }
                // URL changed, pause and reset
                this.audio.pause()
                this.audio.src = url
                this.audio.load()
                this.currentTime = 0
                this.duration = 0
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
