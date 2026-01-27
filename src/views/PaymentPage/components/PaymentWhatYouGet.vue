<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFunnelStore } from '../../../stores/funnel'

const { t } = useI18n()
const store = useFunnelStore()
</script>

<template>
    <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6">
        <div class="flex items-center gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-7 h-7 text-[#E89E2E]">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <h3 class="font-bold text-xl text-black">{{ t('payment.whatYouGet.title') }}</h3>
        </div>

        <div class="space-y-6">
            <!-- Item 1 -->
            <div class="flex gap-4">
                <div class="w-3 h-3 rounded-full bg-[#E89E2E] mt-2 flex-shrink-0"></div>
                <div>
                    <h4 class="font-bold text-black text-lg">{{ t('payment.whatYouGet.item1.title') }}</h4>
                    <p class="text-text-main/70">{{ t('payment.whatYouGet.item1.desc') }}</p>
                </div>
            </div>

            <!-- Item 2 -->
            <div class="flex gap-4">
                <div class="w-3 h-3 rounded-full bg-[#E89E2E] mt-2 flex-shrink-0"></div>
                <div>
                    <h4 class="font-bold text-black text-lg">{{ t('payment.whatYouGet.item2.title') }}</h4>
                    <p class="text-text-main/70">{{ t('payment.whatYouGet.item2.desc', {
                        name:
                            store.answers.recipientName || 'ddd' }) }}</p>
                </div>
            </div>

            <!-- Item 3 -->
            <div class="flex gap-4">
                <div class="w-3 h-3 rounded-full bg-[#E89E2E] mt-2 flex-shrink-0"></div>
                <div>
                    <h4 class="font-bold text-black text-lg">{{ t('payment.whatYouGet.item3.title') }}</h4>
                    <p class="text-text-main/70">{{ t('payment.whatYouGet.item3.desc') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
