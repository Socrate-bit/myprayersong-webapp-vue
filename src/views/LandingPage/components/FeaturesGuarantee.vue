<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GiftButton from '@/components/GiftButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="py-8 px-4 bg-cream flex flex-col items-center">
    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full mb-16 text-center">
      <!-- Radio Quality -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 class="font-serif font-bold text-xl mb-2 text-text-main">{{ t('features.radio.title') }}</h3>
          <p class="text-text-main/80">{{ t('features.radio.desc') }}</p>
        </div>
      </div>

      <!-- Personalized Lyrics -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 class="font-serif font-bold text-xl mb-2 text-text-main">{{ t('features.lyrics.title') }}</h3>
          <p class="text-text-main/80">{{ t('features.lyrics.desc') }}</p>
        </div>
      </div>

      <!-- 7-Day Delivery -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 class="font-serif font-bold text-xl mb-2 text-text-main">{{ t('features.delivery.title') }}</h3>
          <p class="text-text-main/80">{{ t('features.delivery.desc') }}</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <!-- CTA -->
    <GiftButton :text="t('features.cta')" class="mb-6 font-bold px-12" />

    <!-- Guarantee Banner -->
    <div class="w-full bg-cream text-center font-medium text-text-main/80 text-sm tracking-wide uppercase">
      {{ t('features.guarantee') }}
    </div>
  </section>
</template>
