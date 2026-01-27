<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <section class="relative bg-black text-white py-24 px-4 overflow-hidden">
        <!-- Grid Background with Overlay -->
        <div class="absolute inset-0 opacity-30">
            <!-- We use a grid of placeholders here to simulate the marquee effect from the screenshot -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 h-full scale-110">
                <div v-for="i in 16" :key="i" class="bg-gray-700/50 rounded-lg aspect-square"></div>
            </div>
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 class="font-serif text-4xl md:text-5xl font-bold mb-16">
                {{ t('howItWorks.title') }}
            </h2>

            <!-- Steps -->
            <div class="flex flex-col md:flex-row gap-6 w-full max-w-3xl mb-12">
                <!-- Step 1 -->
                <div
                    class="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-4 border border-white/10">
                    <div class="w-12 h-12 rounded-full bg-[#CBA175] flex items-center justify-center text-xl font-bold">
                        1</div>
                    <p class="font-medium text-lg">{{ t('howItWorks.step1') }}</p>
                </div>

                <!-- Step 2 -->
                <div
                    class="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-4 border border-white/10">
                    <div class="w-12 h-12 rounded-full bg-[#CBA175] flex items-center justify-center text-xl font-bold">
                        2</div>
                    <p class="font-medium text-lg">{{ t('howItWorks.step2') }}</p>
                </div>

                <!-- Step 3 -->
                <div
                    class="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-4 border border-white/10">
                    <div class="w-12 h-12 rounded-full bg-[#CBA175] flex items-center justify-center text-xl font-bold">
                        3</div>
                    <p class="font-medium text-lg">{{ t('howItWorks.step3') }}</p>
                </div>
            </div>

            <!-- CTA -->
            <button
                class="bg-[#CBA175] hover:bg-[#b08b62] text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                {{ t('howItWorks.cta') }}
            </button>
        </div>
    </section>
</template>
