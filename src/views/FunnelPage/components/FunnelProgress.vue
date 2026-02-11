<script setup lang="ts">
import { useFunnelStore } from '../../../stores/funnel'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const store = useFunnelStore()
const { t } = useI18n()

const progressPercentage = computed(() => {
  return (store.currentStep / store.totalSteps) * 100
})
</script>

<template>
  <div class="w-full max-w-2xl mx-auto mb-12">
    <!-- Progress Bar -->
    <div class="w-full h-2 bg-[#E5E0D6] rounded-full mb-4 overflow-hidden">
      <div class="h-full bg-secondary transition-all duration-500 ease-out rounded-full"
        :style="{ width: `${progressPercentage}%` }"></div>
    </div>

    <!-- Step Info -->
    <div class="flex justify-between text-sm font-medium text-text-main/60">
      <span>{{ t('funnel.navigation.step', { current: store.currentStep, total: store.totalSteps }) }}</span>
      <span>{{ t('funnel.navigation.complete', { percent: progressPercentage }) }}</span>
    </div>
  </div>
</template>
