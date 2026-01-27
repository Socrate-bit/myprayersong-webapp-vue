<script setup lang="ts">
import { useFunnelStore } from '../../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const store = useFunnelStore()
const { t } = useI18n()

const deliveryDate = computed(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})
</script>

<template>
    <div class="bg-white rounded-2xl border-2 border-[#EAD798] p-6 shadow-sm w-full mb-6">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6 text-[#A05E35]">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.164zm0 0V2.25a2.25 2.25 0 00-2.25-2.25H13.5a2.25 2.25 0 00-2.25 2.25v10.5m0 0v6.75" />
            </svg>
            <h3 class="font-bold text-xl text-black">{{ t('payment.summary.title') }}</h3>
        </div>

        <!-- Details -->
        <div class="space-y-3 mb-6 border-b border-[#F2F0E9] pb-6">
            <div class="flex justify-between items-center text-text-main/80 font-medium">
                <span>{{ t('payment.summary.songFor') }}</span>
                <span class="text-[#B2542B] font-bold">{{ store.answers.recipientName || 'ddd' }}</span>
            </div>
            <div class="flex justify-between items-center text-text-main/80 font-medium">
                <span>{{ t('payment.summary.delivery') }}</span>
                <span class="text-black font-bold">{{ deliveryDate }}</span>
            </div>
        </div>

        <!-- Pricing -->
        <h4 class="font-bold text-lg mb-2">{{ t('payment.summary.customSong') }}</h4>
        <div class="flex items-center justify-between mb-8">
            <span
                class="bg-white border border-[#EAD798] text-[#A05E35] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {{ t('payment.summary.discount') }}
            </span>
            <div class="text-right">
                <span class="text-gray-400 line-through mr-2 text-lg">{{ t('payment.summary.originalPrice') }}</span>
                <span class="text-[#A05E35] font-bold text-2xl">{{ t('payment.summary.price') }}</span>
            </div>
        </div>

        <!-- Edit Button -->
        <button
            class="w-full bg-[#FFFBF2] hover:bg-[#F9F4E5] border border-[#EAD798] text-[#A05E35] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            {{ t('payment.summary.review') }}
        </button>
    </div>
</template>
