<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import img1 from '@/assets/Options/6.jpg'
import img2 from '@/assets/Options/10.jpg'
import img3 from '@/assets/Options/11.jpg'
import img4 from '@/assets/Options/2.jpg'
import img5 from '@/assets/Options/9.jpg'
import img6 from '@/assets/Options/1.jpg'
import img7 from '@/assets/Options/5.jpg'
import img8 from '@/assets/Options/8.jpg'
import img9 from '@/assets/Options/4.jpg'
import GiftButton from '@/components/GiftButton.vue'

const { t } = useI18n()

const categories = [
  { id: 'partner', img: img1 },
  { id: 'children', img: img2 },
  { id: 'loss', img: img3 },
  { id: 'parents', img: img4 },
  { id: 'yourself', img: img5 },
  { id: 'strength', img: img6 },
  { id: 'healing', img: img7 },
  { id: 'prayers', img: img8 },
  { id: 'breakthroughs', img: img9 }
]
</script>

<template>
  <section class="bg-secondary py-16 px-4 text-center">
    <!-- Title -->
    <h2 class="text-white font-serif text-3xl md:text-4xl font-bold mb-16">
      {{ t('giftGrid.title') }}
    </h2>

    <!-- Grid -->
    <div class="max-w-6xl mx-auto grid grid-cols-3 gap-3 md:gap-6 mb-16">
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
