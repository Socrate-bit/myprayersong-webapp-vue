<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAudioStore } from '@/stores/audio'
import { computed, ref, onMounted } from 'vue'
import { getStorageUrl } from '@/services/firebase'
import { SITE_NAME } from '@/constants'

const songUrl = getStorageUrl('songs', 'Exemple1.mp3')

const { t } = useI18n()
const audioStore = useAudioStore()
const localDuration = ref(0)

onMounted(() => {
  const audio = new Audio(songUrl)
  audio.preload = 'metadata'
  audio.onloadedmetadata = () => {
    if (audio.duration && !isNaN(audio.duration)) {
      localDuration.value = audio.duration
    }
  }
})

const isCurrentPlayer = computed(() => audioStore.activeId === 'preview')

const percentage = computed(() => {
  const duration = isCurrentPlayer.value ? audioStore.duration : localDuration.value
  if (!duration) return 0

  if (isCurrentPlayer.value) {
    return (audioStore.currentTime / duration) * 100
  }
  return 0
})

const currentTime = computed(() => {
  return isCurrentPlayer.value ? audioStore.currentTime : 0
})

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const togglePlay = () => {
  audioStore.toggle('preview', songUrl)
}

const handleSeek = (e: MouseEvent) => {
  // If not current player, we should probably start playing first or switch?
  // Let's assume clicking seekbar switches to this player and seeks
  if (!isCurrentPlayer.value) {
    audioStore.play('preview', songUrl)
    // Small delay to allow audio to load/reset before seeking?
    // Pinia store's play is async-ish but `audio` object is created synchronously.
    // However, if we just switched, currentTime is 0.
  }

  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = e.clientX - rect.left
  const width = rect.width
  const percent = x / width
  const duration = isCurrentPlayer.value ? audioStore.duration : localDuration.value
  const time = percent * duration

  if (isCurrentPlayer.value) {
    audioStore.seek(time)
  }
}

const skip = (seconds: number) => {
  if (isCurrentPlayer.value) {
    audioStore.seek(audioStore.currentTime + seconds)
  }
}
</script>

<template>
  <section class="py-16 px-4 bg-creap flex flex-col items-center">
    <!-- Header -->
    <div class="text-center max-w-2xl mb-16">
      <h2 class="font-serif text-3xl md:text-5xl font-bold mb-6 text-text-main">
        {{ t('whatYouGet.title') }}
      </h2>
      <p class="text-text-main/80 text-lg leading-relaxed">
        {{ t('whatYouGet.subtitle') }}
      </p>
    </div>

    <!-- Music Player Card -->
    <div class="bg-white rounded-3xl p-8 shadow-xl w-full max-w-md border border-gray-100 relative">
      <div class="flex flex-col items-center">
        <!-- Vinyl Record Graphic -->
        <div
          class="w-64 h-64 rounded-full bg-gray-900 relative shadow-2xl mb-10 flex items-center justify-center transition-transform duration-[10000ms]"
          :class="{ 'animate-[spin_4s_linear_infinite]': isCurrentPlayer && audioStore.isPlaying }">
          <!-- Inner Grooves (Visual only) -->
          <div class="absolute inset-4 rounded-full border border-gray-800 opacity-50"></div>
          <div class="absolute inset-8 rounded-full border border-gray-800 opacity-50"></div>
          <div class="absolute inset-12 rounded-full border border-gray-800 opacity-50"></div>

          <!-- Label -->
          <div class="w-24 h-24 bg-cream rounded-full flex items-center justify-center shadow-inner relative z-10">
            <span class="font-serif font-bold italic text-sm">{{ SITE_NAME }}</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full h-1.5 bg-gray-200 rounded-full mb-2 cursor-pointer group" @click="handleSeek">
          <div class="h-full bg-secondary rounded-full relative group-hover:bg-secondary-hover transition-colors"
            :style="{ width: `${percentage}%` }">
            <div
              class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow scale-0 group-hover:scale-100 transition-transform">
            </div>
          </div>
        </div>

        <!-- Time -->
        <div class="w-full flex justify-between text-xs font-semibold text-gray-400 mb-6">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(isCurrentPlayer ? audioStore.duration : localDuration) }}</span>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-8">
          <button @click="skip(-10)" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
              <path d="M19 21V3L8 12L19 21ZM5 3V21H2V3H5Z" />
            </svg>
          </button>

          <button @click="togglePlay"
            class="w-16 h-16 rounded-full bg-secondary hover:bg-secondary-hover shadow-lg flex items-center justify-center text-white transform active:scale-95 transition-all hover:shadow-xl hover:scale-105 cursor-pointer">

            <!-- Play Icon -->
            <svg v-if="!(isCurrentPlayer && audioStore.isPlaying)" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 24 24" class="w-8 h-8 ml-1">
              <path d="M8 5V19L19 12L8 5Z" />
            </svg>
            <!-- Pause Icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>

          <button @click="skip(10)" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
              <path d="M5 3V21L16 12L5 3ZM19 3V21H22V3H19Z" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  </section>
</template>
