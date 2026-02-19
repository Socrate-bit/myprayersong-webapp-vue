<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GiftButton from '@/components/GiftButton.vue'

const { t } = useI18n()
</script>

<template>
  <section class="py-12 md:py-24 px-4 bg-[var(--color-cream)] flex flex-col items-center justify-center text-center">
    <h2 class="text-2xl md:text-4xl font-serif font-bold text-text-main mb-6 md:mb-8 max-w-2xl">
      {{ t('reviewsPage.hero.subtitle') }}
    </h2>

    <GiftButton :text="t('reviewsPage.ctaSection.cta')" />
  </section>
</template>
