<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORT_EMAIL } from '@/constants'
const { t } = useI18n()
</script>

<template>
  <div
    class="max-w-3xl mx-auto bg-green-50/50 border border-green-100 rounded-[24px] md:rounded-[32px] p-4 md:p-8 flex flex-col md:flex-row gap-3 md:gap-5 items-start text-left">
    <div class="bg-green-100 rounded-full shrink-0 flex items-center justify-center p-2 md:p-3">
      <!-- Check Icon -->
      <svg class="w-6 h-6 md:w-7 md:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <div class="pt-1">
      <h3 class="text-lg md:text-xl font-bold text-green-900 mb-1.5 md:mb-2 leading-tight">{{
        t('trackOrder.guarantee.title') }}</h3>
      <p class="text-green-800 text-base md:text-lg leading-relaxed">
        <i18n-t keypath="trackOrder.guarantee.text" tag="span">
          <template #email>
            <a :href="`mailto:${SUPPORT_EMAIL}`"
              class="font-bold underline decoration-2 underline-offset-2 hover:text-green-900 transition-colors">
              {{ SUPPORT_EMAIL }}
            </a>
          </template>
        </i18n-t>
      </p>
    </div>
  </div>
</template>
