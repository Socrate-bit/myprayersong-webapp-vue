<script lang="ts">
import { ref } from 'vue'

// Shared state for exclusive playback (singleton across instances)
const activeReviewId = ref<number | null>(null)
</script>

<script setup lang="ts">
import { computed, watch, onUnmounted, onDeactivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
const songUrl = '/songs/Exemple1.mp3'

const { t } = useI18n()

interface Review {
  id: number
  author: string
  verified: boolean
  rating: number
  text: string
  type: 'text' | 'image' | 'video'
  mediaUrl?: string
  songTitle?: string
  songUrl?: string
  date?: string
  poster?: string
}

const props = defineProps<{
  review: Review
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
// Use specific song if available, otherwise fallback to default
// Audio is lazy loaded now

const isMedia = computed(() => props.review.type === 'image' || props.review.type === 'video')
const isVideo = computed(() => props.review.type === 'video')
const isMp4 = computed(() => props.review.mediaUrl?.toLowerCase().includes('.mp4'))
const isPlaying = computed(() => activeReviewId.value === props.review.id)

// Ref for the card element to observe
const cardRef = ref<HTMLElement | null>(null)
const { isIntersecting } = useIntersectionObserver(cardRef, { rootMargin: '200px' })
const hasloaded = ref(false)

let audio: HTMLAudioElement | null = null

watch(isIntersecting, (val) => {
  if (val) hasloaded.value = true
})

// Initialize audio when visible to preload a chunk
watch(hasloaded, (loaded) => {
  if (loaded && !audio && !isVideo.value) {
    audio = new Audio(props.review.songUrl || songUrl)
    audio.preload = 'auto' // Preload a chunk
  }
})

const togglePlay = () => {
  if (isPlaying.value) {
    activeReviewId.value = null
  } else {
    // Lazy init audio only if not video
    if (!audio && !isVideo.value) {
      audio = new Audio(props.review.songUrl || songUrl)
      audio.preload = 'auto'
    }
    activeReviewId.value = props.review.id
  }
}

const isBuffering = ref(false)

const onWaiting = () => {
  if (isPlaying.value) isBuffering.value = true
}

const onPlaying = () => {
  isBuffering.value = false
}

const onVideoEnded = () => {
  activeReviewId.value = null
  isBuffering.value = false
}

watch(isPlaying, (playing) => {
  if (playing) {
    if (isVideo.value && videoRef.value) {
      videoRef.value.play().catch(e => console.error('Video play error:', e))
    } else if (audio) {
      // Play audio (for images)
      audio.currentTime = 0
      audio.play().catch(e => console.error('Audio play error:', e))
    }
  } else {
    isBuffering.value = false
    if (videoRef.value) {
      videoRef.value.pause()
    }
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }
})

onDeactivated(() => {
  if (isPlaying.value) {
    activeReviewId.value = null
  }
})

onUnmounted(() => {
  if (isPlaying.value) {
    activeReviewId.value = null // Stop playback if component is removed
    audio?.pause()
  }
})
const stars = computed(() => {
  const result = []
  for (let i = 1; i <= 5; i++) {
    if (props.review.rating >= i) {
      result.push('full')
    } else if (props.review.rating >= i - 0.5) {
      result.push('half')
    } else {
      result.push('empty')
    }
  }
  return result
})
</script>

<template>
  <div ref="cardRef"
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden break-inside-avoid mb-6 flex flex-col h-full border border-gray-100">
    <!-- Media Section -->
    <div v-if="isMedia && props.review.mediaUrl"
      class="relative group aspect-[4/5] overflow-hidden bg-gray-100 cursor-pointer" @click="togglePlay">

      <!-- Video Player -->
      <video v-if="isVideo && isMp4" ref="videoRef" :src="hasloaded ? props.review.mediaUrl : undefined"
        class="w-full h-full object-cover scale-[1.02]" playsinline :preload="hasloaded ? 'auto' : 'metadata'"
        :poster="props.review.poster" @ended="onVideoEnded" @waiting="onWaiting" @playing="onPlaying"></video>

      <!-- Video Loading Spinner -->
      <div v-if="isVideo && isPlaying && isBuffering"
        class="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[2px] pointer-events-none">
        <div class="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>

      <!-- Image/Thumbnail -->
      <template v-if="!isVideo">
        <img :src="props.review.mediaUrl" :alt="props.review.songTitle || 'Review media'" loading="lazy"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 scale-[1.02]" />
      </template>

      <!-- Video Play Overlay -->
      <!-- Show ONLY if it's an MP4 video and NOT currently playing -->
      <div v-if="isVideo && !isPlaying && isMp4"
        class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none">
        <div
          class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
          <svg class="w-6 h-6 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <!-- Song Title Tag -->
      <div v-if="props.review.songTitle" class="absolute bottom-4 left-4 right-4 pointer-events-none">
        <span
          class="inline-block bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {{ props.review.songTitle }} ♪
        </span>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-4 md:p-6 flex flex-col flex-1">
      <!-- Stars -->
      <div class="flex gap-0.5 text-[var(--color-primary)] mb-2 md:mb-4">
        <div v-for="(type, i) in stars" :key="i" class="relative w-4 h-4">
          <!-- Background (Empty Star) -->
          <svg class="w-4 h-4 text-gray-300 fill-gray-300" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <!-- Foreground (Full Star) -->
          <svg v-if="type === 'full'" class="absolute inset-0 w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <!-- Foreground (Half Star) -->
          <div v-if="type === 'half'" class="absolute inset-0 w-2 h-4 overflow-hidden">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Text -->
      <p class="text-text-main text-sm md:text-base leading-relaxed mb-4 md:mb-6">
        {{ props.review.text }}
      </p>

      <!-- Author -->
      <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
        <div>
          <div class="font-bold text-text-main">{{ props.review.author }}</div>
          <div v-if="props.review.verified" class="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
            <svg class="w-3.5 h-3.5 text-[var(--color-secondary)]" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t('reviewsPage.common.verifiedCustomer') }}
          </div>
        </div>

        <!-- Date Display -->
        <div v-if="props.review.date" class="text-xs text-gray-400 font-medium">
          {{ props.review.date }}
        </div>
      </div>
    </div>
  </div>
</template>
