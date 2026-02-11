<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GiftButton from '@/components/GiftButton.vue'
import { SITE_NAME } from '@/constants'

const { t } = useI18n()
</script>

<template>
  <section class="relative bg-secondary text-white py-16 px-4 overflow-hidden">


    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
      <h2 class="font-serif text-4xl md:text-5xl font-bold mb-16">
        {{ t('howItWorks.title', { siteName: SITE_NAME }) }}
      </h2>

      <!-- Steps -->
      <div class="flex flex-col md:flex-row gap-6 w-full max-w-3xl mb-12">
        <!-- Step 1 -->
        <div
          class="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-4 border border-white/10">
          <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
            1</div>
          <p class="font-medium text-lg">{{ t('howItWorks.step1') }}</p>
        </div>

        <!-- Step 2 -->
        <div
          class="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-4 border border-white/10">
          <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
            2</div>
          <p class="font-medium text-lg">{{ t('howItWorks.step2') }}</p>
        </div>

        <!-- Step 3 -->
        <div
          class="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-4 border border-white/10">
          <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
            3</div>
          <p class="font-medium text-lg">{{ t('howItWorks.step3') }}</p>
        </div>
      </div>

      <!-- CTA -->
      <!-- CTA -->
      <GiftButton :text="t('howItWorks.cta')" />
    </div>
  </section>
</template>
