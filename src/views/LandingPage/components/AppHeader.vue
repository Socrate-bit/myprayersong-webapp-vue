<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SITE_NAME, LOGO_URL } from '@/constants'
const logo = LOGO_URL

const { t } = useI18n()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-secondary sticky top-0 z-50 shadow-md">
    <div class="flex items-center justify-between px-4 py-3 md:py-4 max-w-[1400px] mx-auto w-full">
      <RouterLink to="/">
        <img :src="logo" :alt="SITE_NAME" class="cursor-pointer h-8 md:h-12 w-auto object-contain" />
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink to="/" class="text-text-secondary hover:text-white transition-colors font-medium">
          {{ t('header.home') }}
        </RouterLink>
        <RouterLink to="/track-order" class="text-text-secondary hover:text-white transition-colors font-medium">
          {{ t('header.trackOrder') }}
        </RouterLink>
        <router-link to="/reviews" class="text-text-secondary hover:text-white transition-colors font-medium">
          {{ t('header.reviews') }}
        </router-link>
        <button @click="$router.push('/funnel')"
          class="bg-primary hover:bg-primary-hover text-black px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer hover:scale-105 transform duration-200">
          {{ t('header.createSong') }}
        </button>
      </nav>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden relative z-50 p-2 text-white focus:outline-none">
        <div class="w-6 h-5 flex flex-col justify-between">
          <span
            :class="['block w-full h-0.5 bg-current transition-all duration-300', isMenuOpen ? 'rotate-45 translate-y-2.5' : '']"></span>
          <span
            :class="['block w-full h-0.5 bg-current transition-all duration-300', isMenuOpen ? 'opacity-0' : '']"></span>
          <span
            :class="['block w-full h-0.5 bg-current transition-all duration-300', isMenuOpen ? '-rotate-45 -translate-y-2' : '']"></span>
        </div>
      </button>
    </div>

    <!-- Mobile Drawer Overlay -->
    <div v-if="isMenuOpen" class="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
      @click="isMenuOpen = false">
    </div>

    <!-- Mobile Drawer -->
    <div
      class="fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-secondary z-40 md:hidden transform transition-transform duration-300 ease-out shadow-2xl flex flex-col pt-24 px-6"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'">
      <nav class="flex flex-col gap-6">
        <RouterLink to="/" @click="isMenuOpen = false"
          class="text-lg text-white font-medium border-b border-white/10 pb-4">
          {{ t('header.home') }}
        </RouterLink>
        <RouterLink to="/track-order" @click="isMenuOpen = false"
          class="text-lg text-white font-medium border-b border-white/10 pb-4">
          {{ t('header.trackOrder') }}
        </RouterLink>
        <router-link to="/reviews" @click="isMenuOpen = false"
          class="text-lg text-white font-medium border-b border-white/10 pb-4">
          {{ t('header.reviews') }}
        </router-link>
        <button @click="$router.push('/funnel'); isMenuOpen = false"
          class="mt-4 bg-primary hover:bg-primary-hover text-black px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer text-center">
          {{ t('header.createSong') }}
        </button>
      </nav>
    </div>
  </header>
</template>
