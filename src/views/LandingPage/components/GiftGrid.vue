<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const categories = [
    'partner', 'children', 'loss',
    'parents', 'yourself', 'strength',
    'healing', 'prayers', 'breakthroughs'
]
</script>

<template>
    <section class="bg-black py-24 px-4 text-center">
        <!-- Title -->
        <h2 class="text-white font-serif text-3xl md:text-4xl font-bold mb-16">
            {{ t('giftGrid.title') }}
        </h2>

        <!-- Grid -->
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div v-for="cat in categories" :key="cat"
                class="relative group cursor-pointer overflow-hidden rounded-2xl aspect-video bg-gray-800">
                <!-- Image Placeholder -->
                <div class="absolute inset-0 bg-gray-700 transition-transform duration-500 group-hover:scale-110"></div>

                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

                <!-- Text -->
                <div class="absolute bottom-6 left-0 right-0 font-bold text-white text-lg tracking-wide">
                    {{ t(`giftGrid.categories.${cat}`) }}
                </div>
            </div>
        </div>

        <!-- CTA -->
        <button @click="$router.push('/funnel')"
            class="bg-[#CBA175] hover:bg-[#b08b62] text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            {{ t('giftGrid.cta') }}
        </button>
    </section>
</template>
