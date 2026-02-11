<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted, computed, type ComponentPublicInstance } from 'vue'
import { reviews } from '@/views/ReviewsPage/testimony'
import { getStorageUrl } from '@/services/firebase'
import { SITE_NAME } from '@/constants'

const defaultSongUrl = getStorageUrl('songs', 'Exemple1.mp3')

const { t } = useI18n()

interface CarouselItem {
  id: string | number
  originalId: number
  type: 'text' | 'video' | 'image'
  quote?: string
  author?: string
  verified?: string
  rating?: number
  songTitle?: string
  artist?: string
  mediaUrl?: string
  songUrl?: string
  poster?: string
}

// Prepare testimonials data: Video and Image reviews from landing
const testimonials = computed<CarouselItem[]>(() => {
  const landingReviews = reviews.filter(r => r.showLanding && (r.type === 'video' || r.type === 'image'))

  // Sort: Videos first, then Images
  landingReviews.sort((a, b) => {
    if (a.type === 'video' && b.type !== 'video') return -1
    if (a.type !== 'video' && b.type === 'video') return 1
    return 0
  })

  const items: CarouselItem[] = []

  landingReviews.forEach(review => {
    // 1. Text Card (Comment) - Always comes before its media
    items.push({
      id: `text-${review.id}`,
      originalId: review.id,
      quote: review.text,
      author: review.author,
      verified: t('reviewsPage.common.verifiedCustomer'),
      rating: review.rating,
      type: 'text'
    })

    // 2. Media Card (Video or Image)
    items.push({
      id: `media-${review.id}`,
      originalId: review.id,
      songTitle: review.songTitle || 'Custom Song',
      artist: SITE_NAME,
      type: review.type as 'video' | 'image',
      mediaUrl: review.mediaUrl,
      songUrl: review.songUrl,
      poster: review.poster
    })
  })

  return items
})

// Lazy Loading
const loadedVideos = ref(new Set<number>())
let observer: IntersectionObserver | null = null
const elementIndexMap = new WeakMap<Element, number>()

const observeCard = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el && observer) {
    const element = el as Element
    elementIndexMap.set(element, index)
    observer.observe(element)
  }
}

const scrollContainer = ref<HTMLElement | null>(null)
const currentIndex = ref(0) // Track logical index for dots

// Playback state
const activeIndex = ref<number | null>(null)
const currentAudio = ref<HTMLAudioElement | null>(null)
const videoMap = ref<Map<number, HTMLVideoElement>>(new Map())

const setVideoRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el) {
    videoMap.value.set(index, el as HTMLVideoElement)
  }
}

const scrollToIndex = (index: number) => {
  if (!scrollContainer.value) return
  const cards = scrollContainer.value.children
  if (cards[index]) {
    (cards[index] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
}

const updateCurrentIndexOnScroll = () => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  // Using simple math to determine current index based on scroll position
  if (testimonials.value.length > 0) {
    // Assume all items have roughly same width (85vw + gap)
    // Calculating precisely isn't strictly necessary if we just check the scroll ratio
    const totalScrollableWidth = container.scrollWidth - container.clientWidth
    if (totalScrollableWidth <= 0) {
      currentIndex.value = 0
      return
    }

    // We can find the element closest to center
    const center = container.scrollLeft + (container.clientWidth / 2)
    const children = Array.from(container.children) as HTMLElement[]

    let closestIndex = 0
    let minDistance = Infinity

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + (child.offsetWidth / 2) - container.offsetLeft
      const distance = Math.abs(childCenter - center)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    if (currentIndex.value !== closestIndex) {
      currentIndex.value = closestIndex
    }
  }
}

const next = () => {
  if (testimonials.value.length === 0) return
  if (currentIndex.value >= testimonials.value.length - 1) return // Stop at end

  // If playing, pause
  if (activeIndex.value !== null) {
    stopPlayback()
  }
  currentIndex.value++
  scrollToIndex(currentIndex.value)
}

const prev = () => {
  if (testimonials.value.length === 0) return
  if (currentIndex.value <= 0) return // Stop at start

  if (activeIndex.value !== null) {
    stopPlayback()
  }
  currentIndex.value--
  scrollToIndex(currentIndex.value)
}

const playVideo = async (index: number) => {
  stopPlayback() // Stop any current

  if (!testimonials.value[index]) return

  activeIndex.value = index
  const item = testimonials.value[index]
  const vid = videoMap.value.get(index)

  // 1. Play Video
  if (vid) {
    // Ensure loaded if not already
    if (!loadedVideos.value.has(index)) {
      loadedVideos.value.add(index)
      // Wait for DOM update so src is applied
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    vid.play().catch(e => console.error("Video play error:", e))
  }

  // 2. Play Audio (Synced logic from ReviewCard.vue)
  const audioSrc = item.songUrl || defaultSongUrl
  const audio = new Audio(audioSrc)
  audio.preload = 'auto'
  currentAudio.value = audio

  // If video (MP4), skip to 15s
  if (item.mediaUrl?.toLowerCase().includes('.mp4')) {
    audio.currentTime = 15
  }

  audio.play().catch(e => console.error("Audio play error:", e))

  // Sync end
  audio.onended = onVideoEnded
  if (vid) {
    vid.onended = onVideoEnded
  }
}

const stopPlayback = () => {
  // Stop Video
  if (activeIndex.value !== null) {
    const vid = videoMap.value.get(activeIndex.value)
    if (vid) vid.pause()
  }
  // Stop Audio
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value = null
  }
  activeIndex.value = null
}

const onVideoEnded = () => {
  stopPlayback()
}

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', updateCurrentIndexOnScroll, { passive: true })

  // Setup Observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = elementIndexMap.get(entry.target)
        if (index !== undefined) {
          loadedVideos.value.add(index)
          // We could also preload audio here if we wanted, but there are many items.
          // Let's stick to video preload='auto' change.
          observer?.unobserve(entry.target)
        }
      }
    })
  }, { root: null, threshold: 0.1, rootMargin: '200px' }) // Add rootMargin to start loading before it enters viewport
})

onUnmounted(() => {
  stopPlayback() // Stops media
  scrollContainer.value?.removeEventListener('scroll', updateCurrentIndexOnScroll)
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <section class="py-12 bg-cream overflow-hidden">
    <!-- Title -->
    <div class="max-w-7xl mx-auto px-4 mb-10">
      <h2 class="font-serif text-2xl md:text-3xl font-bold text-center text-text-main">
        {{ t('testimonials.title') }}
      </h2>
    </div>

    <!-- Carousel Container -->
    <div class="relative w-full group/carousel">

      <!-- Arrow Left -->
      <button @click="prev"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0, 'hover:bg-white cursor-pointer': currentIndex > 0 }"
        :disabled="currentIndex === 0"
        class="absolute left-4 top-[35%] -translate-y-1/2 z-30 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
          class="w-5 h-5 text-gray-800">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Arrow Right -->
      <button @click="next"
        :class="{ 'opacity-50 cursor-not-allowed': currentIndex >= testimonials.length - 1, 'hover:bg-white cursor-pointer': currentIndex < testimonials.length - 1 }"
        :disabled="currentIndex >= testimonials.length - 1"
        class="absolute right-4 top-[35%] -translate-y-1/2 z-30 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
          class="w-5 h-5 text-gray-800">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <!-- Scrollable List -->
      <div ref="scrollContainer"
        class="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 px-4 scrollbar-hide md:px-12 items-stretch"
        style="scrollbar-width: none; -ms-overflow-style: none;">
        <div v-for="(item, index) in testimonials" :key="item.id" :ref="(el) => observeCard(el, index)"
          class="snap-center shrink-0 w-[63vw] max-w-[330px] flex flex-col rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white h-[375px]"
          :class="{ 'bg-black': item.type === 'video' || item.type === 'image' }">

          <!-- VIDEO/IMAGE CARD -->
          <div v-if="item.type === 'video' || item.type === 'image'" class="relative w-full h-full group">
            <!-- Media Element -->
            <video v-if="item.type === 'video' && item.mediaUrl?.toLowerCase().includes('.mp4')"
              :ref="(el) => setVideoRef(el, index)" :src="loadedVideos.has(index) ? item.mediaUrl : undefined"
              class="w-full h-full object-cover object-top scale-[1.02]" playsinline
              :preload="loadedVideos.has(index) ? 'auto' : 'none'" :poster="item.poster" @click="stopPlayback"></video>
            <img v-else :src="item.mediaUrl" class="w-full h-full object-cover object-top scale-[1.02]" />

            <!-- Overlay (Only for Video) -->
            <div v-if="item.type === 'video' && activeIndex !== index" @click.stop="playVideo(index)"
              class="absolute inset-0 bg-black/10 flex flex-col justify-end p-5 cursor-pointer hover:bg-black/20 transition-colors">
              <!-- Big Play Button -->
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  class="w-12 h-12 rounded-full bg-secondary/90 flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-6 h-6 text-white ml-0.5">
                    <path fill-rule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <!-- Clean Overlay (No song info as requested) -->
            </div>
          </div>

          <!-- TEXT CARD -->
          <div v-else class="flex flex-col h-full p-6 relative">
            <!-- Top Quote Icon -->
            <div class="absolute top-5 right-6 text-gray-100">
              <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.0069 11.2335 12.8715 7.37346 17.6325 7.37346L18 7.37346V3.37346L17.6325 3.37346C10.669 3.37346 5.01168 9.03083 5 15.9935V21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16C16.0069 11.2335 19.8715 7.37346 24.6325 7.37346L25 7.37346V3.37346L24.6325 3.37346C17.669 3.37346 12.0117 9.03083 12 15.9935V21H21.017Z"
                  opacity="0.2" />
              </svg>
            </div>

            <!-- Stars -->
            <div class="flex gap-1 mb-5">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-4 h-4" :class="i <= (item.rating || 0) ? 'text-yellow-400' : 'text-gray-200'">
                <path fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clip-rule="evenodd" />
              </svg>
            </div>

            <!-- Content -->
            <blockquote
              class="font-serif text-base leading-relaxed text-text-main flex-1 overflow-y-auto pr-2 relative z-10">
              "{{ item.quote }}"
            </blockquote>

            <!-- Author -->
            <div class="mt-6 flex items-center gap-3 pt-5 border-t border-gray-100">
              <div
                class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-base flex-shrink-0">
                {{ item.author?.substring(0, 1) }}
              </div>
              <div>
                <div class="font-bold text-text-main text-sm">{{ item.author }}</div>
                <!-- Verified Customer (Reused from ReviewCard) -->
                <div class="flex items-center gap-1.5 text-xs text-text-muted mt-0.5 font-medium">
                  <svg class="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ t('reviewsPage.common.verifiedCustomer') }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Pagination Dots -->
      <div class="flex justify-center gap-2 mt-6">
        <button v-for="(_, index) in testimonials" :key="index"
          @click="() => { currentIndex = index; scrollToIndex(index) }"
          class="w-2.5 h-2.5 rounded-full transition-all duration-300"
          :class="index === currentIndex ? 'bg-secondary' : 'bg-gray-300 hover:bg-gray-400'">
        </button>
      </div>

      <!-- See All Reviews Button -->
      <div class="flex justify-center mt-10">
        <router-link to="/reviews"
          class="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-secondary rounded-full hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          {{ t('reviewsPage.hero.title') }}
        </router-link>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Ensure absolute positioning works for transition */
.carousel-move {
  transition: transform 0.5s ease;
}
</style>
