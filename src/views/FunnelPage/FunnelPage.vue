<script setup lang="ts">
import FunnelProgress from './components/FunnelProgress.vue'
import FunnelStep1 from './components/FunnelStep1.vue'
import FunnelStep2 from './components/FunnelStep2.vue'
import FunnelStep3 from './components/FunnelStep3.vue'
import FunnelStep4 from './components/FunnelStep4.vue'
import FunnelStep5 from './components/FunnelStep5.vue'
import { useFunnelStore } from '../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { SITE_NAME } from '@/constants'
const logo = '/En-tête.png'

const store = useFunnelStore()
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-cream flex flex-col">
    <!-- Simple Header -->
    <header class="py-6 flex justify-center border-b border-[#E5E0D6]/50 bg-secondary">
      <img :src="logo" :alt="t('title', { siteName: SITE_NAME })" class="h-12 w-auto object-contain" />
    </header>

    <!-- Main Content -->
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <FunnelProgress />

      <!-- Dynamic Step Rendering -->
      <transition name="fade" mode="out-in">
        <component :is="store.currentStep === 1 ? FunnelStep1 :
          store.currentStep === 2 ? FunnelStep2 :
            store.currentStep === 3 ? FunnelStep3 :
              store.currentStep === 4 ? FunnelStep4 :
                store.currentStep === 5 ? FunnelStep5 : 'div'" />
      </transition>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
