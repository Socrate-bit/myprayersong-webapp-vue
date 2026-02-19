<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GiftButton from '@/components/GiftButton.vue'
import { SITE_NAME } from '@/constants'

const { t } = useI18n()
</script>

<template>
  <section class="bg-[var(--color-cream)] py-8 md:py-16 px-4 flex flex-col items-center text-center">
    <div class="max-w-4xl w-full">
      <h1 class="text-3xl md:text-5xl font-serif font-bold text-text-main mb-4 md:mb-6">
        {{ t('reviewsPage.hero.title') }}
      </h1>
      <p class="text-lg md:text-xl text-text-main/80 mb-8 leading-relaxed max-w-2xl mx-auto">
        {{ t('reviewsPage.hero.subtitle', { siteName: SITE_NAME }) }}
      </p>

      <!-- Trust Indicators -->
      <div
        class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10 text-sm md:text-base font-medium text-text-main">
        <!-- Stars -->
        <div class="flex items-center gap-2">
          <div class="flex text-[var(--color-primary)]">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="font-bold">4.9/5</span>
        </div>

        <!-- Happy Customers -->
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>{{ t('reviewsPage.hero.happyCustomers') }}</span>
        </div>

        <!-- Verified Reviews -->
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ t('reviewsPage.hero.verified') }}</span>
        </div>
      </div>

      <!-- CTA -->
      <GiftButton class="mx-auto" :text="t('reviewsPage.hero.cta')" />
    </div>
  </section>
</template>
