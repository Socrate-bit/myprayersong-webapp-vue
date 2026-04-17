<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { PRICE_ORIGINAL, PRICE_NOW } from '@/constants'

const { t } = useI18n()
</script>

<template>
  <div
    class="bg-[var(--color-primary)]/10 rounded-2xl border-2 border-[var(--color-primary)]/30 p-4 md:p-6 shadow-sm w-full mb-4 md:mb-6">
    <div class="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
      <div class="text-3xl md:text-4xl">🎁</div>
      <div>
        <h3 class="font-bold text-lg md:text-xl text-black mb-1 md:mb-2">
          {{ t('payment.discountCard.title') }}
        </h3>
        <p class="text-text-main mb-4 leading-relaxed">
          <i18n-t keypath="payment.discountCard.p1" tag="span">
            <template #originalPrice>
              <span class="line-through">{{ t('payment.summary.originalPrice', { price: PRICE_ORIGINAL })
                }}</span>
            </template>
            <template #price>
              <span class="font-bold">{{ t('payment.summary.price', { price: PRICE_NOW }) }}</span>
            </template>
          </i18n-t>
        </p>
        <p class="text-text-main font-bold text-sm leading-relaxed">
          {{ t('payment.discountCard.p2') }}
        </p>
      </div>
    </div>
  </div>
</template>
