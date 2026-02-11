<script setup lang="ts">
import { useFunnelStore } from '../../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { PRICE_NOW, PRICE_EXPRESS, PRICE_ORIGINAL, PRICE_EXPRESS_UPGRADE } from '@/constants'

const store = useFunnelStore()
const { t, locale } = useI18n()

// Use store for express state to coordinate with payment form
const isExpress = computed({
  get: () => store.answers.isExpress || false,
  set: (val: boolean) => store.setIsExpress(val)
})

const deliveryDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + (isExpress.value ? 1 : 7))
  return date.toLocaleDateString(locale.value, { day: 'numeric', month: 'long' })
})

const displayedPrice = computed(() => {
  return isExpress.value
    ? t('payment.summary.totalExpress', { price: PRICE_EXPRESS })
    : t('payment.summary.price', { price: PRICE_NOW })
})

const emit = defineEmits<{
  (e: 'open-edit'): void
}>()
</script>

<template>
  <div class="bg-white rounded-2xl border-2 border-secondary/30 p-6 shadow-sm w-full mb-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-6 h-6 text-secondary">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.164zm0 0V2.25a2.25 2.25 0 00-2.25-2.25H13.5a2.25 2.25 0 00-2.25 2.25v10.5m0 0v6.75" />
      </svg>
      <h3 class="font-bold text-xl text-black">{{ t('payment.summary.title') }}</h3>
    </div>

    <!-- Details -->
    <div class="space-y-3 mb-6 border-b border-[#F2F0E9] pb-6">
      <div class="flex justify-between items-center text-text-main/80 font-medium">
        <span>{{ t('payment.summary.songFor') }}</span>
        <span class="text-secondary font-bold">{{ store.answers.recipientName || 'Your Love' }}</span>
      </div>
      <div class="flex justify-between items-center text-text-main/80 font-medium">
        <span>{{ t('payment.summary.delivery') }}</span>
        <span class="text-black font-bold">{{ deliveryDate }}</span>
      </div>
    </div>

    <!-- Express Delivery Option -->
    <div class="flex items-start gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div class="pt-1">
        <input type="checkbox" id="express-delivery" v-model="isExpress"
          class="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-secondary cursor-pointer accent-secondary">
      </div>
      <label for="express-delivery" class="cursor-pointer flex-1">
        <div class="flex justify-between items-center">
          <span class="font-bold text-text-main">{{ t('payment.summary.express') }}</span>
          <span class="font-bold text-secondary">{{ t('payment.summary.expressPrice', { price: PRICE_EXPRESS_UPGRADE })
            }}</span>
        </div>
        <p class="text-sm text-text-muted mt-1">{{ t('payment.summary.expressDesc') }}</p>
      </label>
    </div>

    <!-- Pricing -->
    <h4 class="font-bold text-lg mb-2">{{ t('payment.summary.customSong') }}</h4>
    <div class="flex items-center justify-between mb-8">
      <span
        class="bg-white border border-secondary/30 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        {{ t('payment.summary.discount') }}
      </span>
      <div class="text-right">
        <span class="text-gray-400 line-through mr-2 text-lg">{{ t('payment.summary.originalPrice', {
          price:
            PRICE_ORIGINAL
        }) }}</span>
        <span class="text-secondary font-bold text-2xl">{{ displayedPrice }}</span>
      </div>
    </div>

    <!-- Edit Button -->
    <button @click="emit('open-edit')"
      class="w-full bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-secondary font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
      {{ t('payment.summary.review') }}
    </button>
  </div>
</template>
