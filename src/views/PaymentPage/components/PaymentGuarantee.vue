<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex items-center gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-7 h-7 text-secondary">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <h3 class="font-bold text-xl text-black">{{ t('payment.guaranteeFull.title') }}</h3>
        </div>

        <div class="space-y-6">
            <div v-for="i in 3" :key="i" class="flex gap-4">
                <div class="w-3 h-3 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                <div>
                    <h4 class="font-bold text-black text-lg">{{ t(`payment.guaranteeFull.item${i}.title`) }}</h4>
                    <p class="text-text-main/70">{{ t(`payment.guaranteeFull.item${i}.desc`) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
