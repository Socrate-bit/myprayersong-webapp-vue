<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAudioStore } from '@/stores/audio'

const songUrl = '/songs/Lucas_woman.mp3'
const landingVideoDesktop = '/video_landing_desktop.mp4'
const landingDesktopPoster = '/landing_desktop_poster.jpg'

const { t } = useI18n()
const audioStore = useAudioStore()

const isVideoLoaded = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const handleVideoLoad = () => {
  isVideoLoaded.value = true
}

onActivated(() => {
  if (videoRef.value) {
    audioStore.pause()
    videoRef.value.play().catch(e => console.error('Hero video play error:', e))
  }
})

onDeactivated(() => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
})


</script>

<template>
  <section class="flex flex-col items-center pt-0 md:pt-8 px-0 md:px-4 md:pb-4">
    <!-- Main Video/Image Container -->
    <div
      class="relative w-full max-w-[500px] md:max-w-[600px] aspect-video rounded-none md:rounded-3xl overflow-hidden shadow-xl bg-gray-200">

      <!-- Poster Image (Bottom Layer) -->
      <img :src="landingDesktopPoster" class="absolute inset-0 w-full h-full object-cover z-0" alt="Hero Poster" />

      <!-- Video (Middle Layer) -->
      <video ref="videoRef"
        class="absolute inset-0 w-full h-full object-cover object-top scale-[1.02] transition-opacity duration-500 z-10"
        :class="{ 'opacity-0': !isVideoLoaded, 'opacity-100': isVideoLoaded }" :src="landingVideoDesktop"
        :poster="landingDesktopPoster" autoplay loop muted playsinline crossorigin="anonymous" preload="auto"
        fetchpriority="high" @loadeddata="handleVideoLoad" @canplay="handleVideoLoad"></video>

      <!-- Loading Spinner (Top Layer) -->
      <div v-if="!isVideoLoaded"
        class="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
        <div class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>

      <!-- Listen Button Overlay (Highest Layer) -->
      <div class="absolute bottom-4 right-3 md:bottom-6 md:right-6 z-30">
        <button @click="audioStore.toggle('hero', songUrl)"
          class="flex items-center gap-2 md:gap-3 bg-white/90 hover:bg-white backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2.5 rounded-full shadow-lg transition-all cursor-pointer group">
          <div
            class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <!-- Play Icon -->
            <svg v-if="!(audioStore.activeId === 'hero' && audioStore.isPlaying)" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 md:w-4 md:h-4 text-white ml-0.5">
              <path fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clip-rule="evenodd" />
            </svg>
            <!-- Pause Icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-3 h-3 md:w-4 md:h-4 text-white">
              <path fill-rule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <span class="font-semibold text-text-main text-xs md:text-sm">
            {{ t('hero.listenExample') }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
