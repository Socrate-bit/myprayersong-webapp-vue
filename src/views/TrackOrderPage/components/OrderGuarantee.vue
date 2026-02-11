<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORT_EMAIL } from '@/constants'
const { t } = useI18n()
</script>

<template>
  <div
    class="max-w-3xl mx-auto bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 items-start text-left">
    <div class="bg-green-100 p-2 rounded-full shrink-0 mt-1">
      <!-- Check Icon -->
      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <div>
      <h3 class="text-lg font-bold text-green-900 mb-2">{{ t('trackOrder.guarantee.title') }}</h3>
      <p class="text-green-800 leading-relaxed">
        <i18n-t keypath="trackOrder.guarantee.text" tag="span">
          <template #email>
            <a :href="`mailto:${SUPPORT_EMAIL}`" class="font-bold underline hover:text-green-900 transition-colors">
              {{ SUPPORT_EMAIL }}
            </a>
          </template>
        </i18n-t>
      </p>
    </div>
  </div>
</template>
