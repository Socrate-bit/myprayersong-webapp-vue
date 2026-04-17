<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUrgencyTimer } from '@/composables/useUrgencyTimer'

const { t } = useI18n()
const { hasStarted, isExpired, formatted } = useUrgencyTimer()

const TOTAL_SPOTS = 50
const SPOTS_TAKEN = 48
const fillPercent = (SPOTS_TAKEN / TOTAL_SPOTS) * 100

const weekDeadline = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
})
</script>

<template>
  <div v-if="hasStarted" class="w-full max-w-6xl px-4 mb-2 md:mb-4">
    <div class="rounded-xl border border-red-300 bg-red-50 px-5 py-4 flex flex-col gap-3 text-sm">

      <!-- Title -->
      <p class="font-extrabold text-red-700 tracking-wide flex items-center gap-1.5">
        ⚠️ {{ t('payment.urgency.title') }}
      </p>

      <!-- Justification -->
      <p class="text-red-700">{{ t('payment.urgency.justification') }}</p>

      <!-- Progress bar -->
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between text-xs font-bold text-red-700">
          <span>{{ t('payment.urgency.status') }}</span>
          <span class="font-normal text-red-500">até {{ weekDeadline }}</span>
        </div>
        <div class="w-full h-3 bg-red-200 rounded-full overflow-hidden">
          <div class="h-full bg-red-600 rounded-full transition-all duration-700"
            :style="{ width: `${fillPercent}%` }" />
        </div>
        <p class="text-xs font-extrabold text-red-700 text-right">
          {{ TOTAL_SPOTS - SPOTS_TAKEN }} / {{ TOTAL_SPOTS }} restantes
        </p>
      </div>

      <!-- Countdown -->
      <p v-if="!isExpired" class="text-red-700 flex items-center gap-1.5 border-t border-red-200 pt-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
        {{ t('payment.urgency.reserved') }}
        <span class="font-mono font-extrabold tabular-nums">{{ formatted }}</span>
      </p>
      <p v-else class="font-bold text-red-700 border-t border-red-200 pt-2">{{ t('payment.urgency.expired') }}</p>

    </div>
  </div>
</template>
