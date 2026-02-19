<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GiftButton from '@/components/GiftButton.vue'
const { t } = useI18n()

const categories = [
  { id: 'partner', img: '/Options/6.jpg' },
  { id: 'children', img: '/Options/10.jpg' },
  { id: 'loss', img: '/Options/11.jpg' },
  { id: 'parents', img: '/Options/2.jpg' },
  { id: 'yourself', img: '/Options/9.jpg' },
  { id: 'strength', img: '/Options/1.jpg' },
  { id: 'healing', img: '/Options/5.jpg' },
  { id: 'prayers', img: '/Options/8.jpg' },
  { id: 'breakthroughs', img: '/Options/4.jpg' }
]
</script>

<template>
  <section class="bg-secondary py-8 md:py-16 px-4 text-center">
    <!-- Title -->
    <h2 class="text-white font-serif text-2xl md:text-4xl font-bold mb-6 md:mb-16">
      {{ t('giftGrid.title') }}
    </h2>

    <!-- Grid -->
    <div class="max-w-3xl mx-auto grid grid-cols-3 gap-2 md:gap-6 mb-8 md:mb-16">
      <div v-for="cat in categories" :key="cat.id"
        class="relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl aspect-square bg-gray-800">
        <!-- Image -->
        <img :src="cat.img" :alt="t(`giftGrid.categories.${cat.id}`)"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        <!-- Text -->
        <div
          class="absolute bottom-2 md:bottom-6 left-0 right-0 font-bold text-white text-xs md:text-lg tracking-wide px-1">
          {{ t(`giftGrid.categories.${cat.id}`) }}
        </div>
      </div>
    </div>

    <!-- CTA -->
    <!-- CTA -->
    <div class="flex justify-center">
      <GiftButton :text="t('giftGrid.cta')" />
    </div>
  </section>
</template>
