<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAudioStore } from '@/stores/audio'
import { getStorageUrl } from '@/services/firebase'

const songUrl = getStorageUrl('songs', 'Exemple1.mp3')
const landingVideo = '/video_landing.mp4'
const landingVideoDesktop = '/video_landing_desktop.mp4'

const landingPoster = '/landing_mobile_poster.jpg'
const landingDesktopPoster = '/landing_desktop_poster.jpg'

const { t } = useI18n()
const audioStore = useAudioStore()

const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
const isVideoLoaded = ref(false)

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

const handleVideoLoad = () => {
  isVideoLoaded.value = true
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <section class="flex flex-col items-center pt-16 px-4">
    <!-- Main Video/Image Container -->
    <div
      class="relative w-full max-w-[500px] md:max-w-[900px] aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-xl bg-gray-200">

      <!-- Poster Image (Bottom Layer) -->
      <img :src="isMobile ? landingPoster : landingDesktopPoster"
        class="absolute inset-0 w-full h-full object-cover z-0" alt="Hero Poster" />

      <!-- Mobile Video (Middle Layer) -->
      <video v-if="isMobile" key="mobile"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10"
        :class="{ 'opacity-0': !isVideoLoaded, 'opacity-100': isVideoLoaded }" :src="landingVideo"
        :poster="landingPoster" autoplay loop muted playsinline crossorigin="anonymous" preload="auto"
        fetchpriority="high" @loadeddata="handleVideoLoad" @canplay="handleVideoLoad"></video>

      <!-- Desktop Video (Middle Layer) -->
      <video v-else key="desktop"
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
      <div class="absolute bottom-6 right-6 z-30">
        <button @click="audioStore.toggle('hero', songUrl)"
          class="flex items-center gap-3 bg-white/90 hover:bg-white backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg transition-all cursor-pointer group">
          <div
            class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <!-- Play Icon -->
            <svg v-if="!(audioStore.activeId === 'hero' && audioStore.isPlaying)" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white ml-0.5">
              <path fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clip-rule="evenodd" />
            </svg>
            <!-- Pause Icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-4 h-4 text-white">
              <path fill-rule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <span class="font-semibold text-text-main text-sm">
            {{ t('hero.listenExample') }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
