<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GiftButton from '@/components/GiftButton.vue'
const { t } = useI18n()
const avatars = [
  '/avatar/1.jpg',
  '/avatar/2.jpg',
  '/avatar/3.jpg',
  '/avatar/4.jpg'
]
</script>

<template>
  <section class="flex flex-col items-center pb-4 md:pb-8 px-4 text-center max-w-4xl mx-auto">
    <!-- Top Badge -->
    <div class="tracking-widest text-xs font-bold text-text-main/70 uppercase mb-2 md:mb-6">
      {{ t('valueProp.badge') }}
    </div>

    <!-- Headline -->
    <h1 class="font-serif text-3xl md:text-6xl font-bold text-text-main mb-2 md:mb-6 leading-tight">
      {{ t('valueProp.headline') }}
    </h1>

    <!-- Subheadline -->
    <p class="font-sans text-md  md:text-xl text-text-main/80 mb-4 md:mb-10 max-w-2xl">
      {{ t('valueProp.subheadline') }}
    </p>

    <!-- CTA Button -->
    <!-- CTA Button -->
    <GiftButton :text="t('valueProp.cta')" />

    <!-- Delivery Text -->
    <p class="font-serif italic text-text-main/70 mb-8 md:mb-10 text-sm">
      {{ t('valueProp.delivery') }}
    </p>

    <!-- Social Proof -->
    <div class="flex flex-col items-center gap-3">
      <!-- Stars -->
      <div class="flex gap-1 text-primary">
        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="w-6 h-6">
          <path fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clip-rule="evenodd" />
        </svg>
      </div>

      <!-- Avatars & Count -->
      <div class="flex items-center gap-4">
        <div class="flex -space-x-4">
          <div v-for="(avatar, index) in avatars" :key="index"
            class="w-10 h-10 rounded-full border-2 border-cream bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-500 overflow-hidden">
            <img :src="avatar" alt="User avatar" class="w-full h-full object-cover" />
          </div>
          <div
            class="w-10 h-10 rounded-full border-2 border-cream bg-secondary flex items-center justify-center text-xs font-bold text-white z-10">
            +4318
          </div>
        </div>
      </div>

      <!-- Loved By Text -->
      <p class="text-text-main/80 font-medium">
        {{ t('valueProp.lovedBy') }}
      </p>
    </div>
  </section>
</template>
