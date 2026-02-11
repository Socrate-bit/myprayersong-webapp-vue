<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { PRICE_ORIGINAL, PRICE_NOW } from '@/constants'

const { t } = useI18n()
</script>

<template>
  <div class="bg-primary/5 rounded-2xl border-2 border-primary/30 p-6 shadow-sm w-full mb-6">
    <div class="flex items-start gap-4 mb-4">
      <div class="text-4xl">🎁</div>
      <div>
        <h3 class="font-bold text-xl text-secondary mb-4">
          {{ t('payment.discountCard.title') }}
        </h3>
        <p class="text-text-main mb-4 leading-relaxed">
          <i18n-t keypath="payment.discountCard.p1" tag="span">
            <template #originalPrice>
              <span class="line-through opacity-70">{{ t('payment.summary.originalPrice', { price: PRICE_ORIGINAL })
                }}</span>
            </template>
            <template #price>
              <span class="font-bold">{{ t('payment.summary.price', { price: PRICE_NOW }) }}</span>
            </template>
          </i18n-t>
        </p>
        <p class="text-text-main font-bold text-sm leading-relaxed opacity-90">
          {{ t('payment.discountCard.p2') }}
        </p>
      </div>
    </div>
  </div>
</template>
