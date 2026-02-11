<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SITE_NAME } from '@/constants'

const { t } = useI18n()
</script>

<template>
  <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
    <div class="flex items-center gap-3 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-7 h-7 text-secondary">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
      <h3 class="font-bold text-xl text-black">{{ t('payment.whyChoose.title', { siteName: SITE_NAME }) }}</h3>
    </div>

    <div class="space-y-4">
      <div v-for="i in 4" :key="i" class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-6 h-6 text-secondary flex-shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-lg text-text-main font-medium">{{ t(`payment.whyChoose.item${i}`, { siteName: SITE_NAME })
          }}</span>
      </div>
    </div>
  </div>
</template>
