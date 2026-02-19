<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  text?: string
}>()

const { t } = useI18n()
</script>


<template>
  <button @click="$router.push('/funnel')"
    class="bg-primary hover:bg-primary-hover text-black text-md md:text-lg font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 mb-4 flex items-center gap-3 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      class="w-8 h-8 md:w-6 md:h-6">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
    <slot>{{ t('valueProp.cta') }}</slot>
  </button>
</template>
