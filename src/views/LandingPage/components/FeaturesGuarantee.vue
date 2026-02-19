<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GiftButton from '@/components/GiftButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="py-12 md:py-10  px-4 bg-cream flex flex-col items-center">
    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-6xl w-full mb-6 md:mb-16 text-center">
      <!-- Radio Quality -->
      <div class="flex md:flex-col items-start md:items-center text-left md:text-center gap-4">
        <div
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-5 h-5 md:w-6 md:h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 class="font-serif font-bold text-lg md:text-xl mb-1 md:mb-2 text-text-main leading-tight">{{
            t('features.radio.title') }}</h3>
          <p class="text-text-main/80 text-sm md:text-base leading-relaxed">{{ t('features.radio.desc') }}</p>
        </div>
      </div>

      <!-- Personalized Lyrics -->
      <div class="flex md:flex-col items-start md:items-center text-left md:text-center gap-4">
        <div
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-5 h-5 md:w-6 md:h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 class="font-serif font-bold text-lg md:text-xl mb-1 md:mb-2 text-text-main leading-tight">{{
            t('features.lyrics.title') }}</h3>
          <p class="text-text-main/80 text-sm md:text-base leading-relaxed">{{ t('features.lyrics.desc') }}</p>
        </div>
      </div>

      <!-- 7-Day Delivery -->
      <div class="flex md:flex-col items-start md:items-center text-left md:text-center gap-4">
        <div
          class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-white shadow-lg shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
            stroke="currentColor" class="w-5 h-5 md:w-6 md:h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 class="font-serif font-bold text-lg md:text-xl mb-1 md:mb-2 text-text-main leading-tight">{{
            t('features.delivery.title') }}</h3>
          <p class="text-text-main/80 text-sm md:text-base leading-relaxed">{{ t('features.delivery.desc') }}</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <GiftButton :text="t('features.cta')" class="mb-4 md:mb-6 font-bold px-12" />

    <!-- Guarantee Banner -->
    <div
      class="w-full bg-cream text-center font-medium text-text-main/60 text-[10px] md:text-sm tracking-widest uppercase">
      {{ t('features.guarantee') }}
    </div>
  </section>
</template>
