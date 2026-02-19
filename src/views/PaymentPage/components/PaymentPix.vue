<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const pixLogo = '/pix-seeklogo.png'

const { t } = useI18n()
</script>

<template>
  <div class="bg-white rounded-3xl p-6 md:p-8 shadow-xl w-full border border-gray-100">
    <div class="flex items-center justify-center gap-4">
      <img :src="pixLogo" class="h-8 w-auto" alt="Pix" />
      <div class="flex flex-col items-start text-left">
        <span class="text-lg font-bold text-gray-700 leading-tight">{{ t('payment.acceptPix') }}</span>
        <span class="text-sm text-pix font-semibold leading-tight mt-1">
          <span class="inline-block mr-1">⚡</span>{{ t('payment.instantApproval') }}
        </span>
      </div>
    </div>
  </div>
</template>
