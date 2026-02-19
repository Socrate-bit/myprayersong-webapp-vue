<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div
    class="bg-black text-white py-2 px-4 text-center text-xs md:text-sm font-bold tracking-wide uppercase shadow-sm relative z-[60]">
    {{ t('promoBanner.text') }}
  </div>
</template>

<style scoped>
div {
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.95;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.95;
  }
}
</style>
