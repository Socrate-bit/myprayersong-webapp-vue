<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <section class="py-24 px-4 bg-[#F2F0E9] flex flex-col items-center">
        <!-- Header -->
        <div class="text-center max-w-2xl mb-16">
            <h2 class="font-serif text-3xl md:text-5xl font-bold mb-6 text-text-main">
                {{ t('whatYouGet.title') }}
            </h2>
            <p class="text-text-main/80 text-lg leading-relaxed">
                {{ t('whatYouGet.subtitle') }}
            </p>
        </div>

        <!-- Music Player Card -->
        <div class="bg-white rounded-3xl p-8 shadow-xl w-full max-w-md border border-gray-100 relative">
            <div class="flex flex-col items-center">
                <!-- Vinyl Record Graphic -->
                <div
                    class="w-64 h-64 rounded-full bg-gray-900 relative shadow-2xl mb-10 flex items-center justify-center">
                    <!-- Inner Grooves (Visual only) -->
                    <div class="absolute inset-4 rounded-full border border-gray-800 opacity-50"></div>
                    <div class="absolute inset-8 rounded-full border border-gray-800 opacity-50"></div>
                    <div class="absolute inset-12 rounded-full border border-gray-800 opacity-50"></div>

                    <!-- Label -->
                    <div class="w-24 h-24 bg-[#FFFBF2] rounded-full flex items-center justify-center shadow-inner">
                        <span class="font-serif font-bold italic text-sm">PrayerSong</span>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="w-full h-1.5 bg-gray-200 rounded-full mb-2">
                    <div class="w-1/3 h-full bg-[#E58A5E] rounded-full relative">
                        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#E58A5E] rounded-full shadow">
                        </div>
                    </div>
                </div>

                <!-- Time -->
                <div class="w-full flex justify-between text-xs font-semibold text-gray-400 mb-6">
                    <span>0:00</span>
                    <span>{{ t('whatYouGet.duration') }}</span>
                </div>

                <!-- Controls -->
                <div class="flex items-center gap-8">
                    <button class="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
                            <path d="M19 21V3L8 12L19 21ZM5 3V21H2V3H5Z" />
                        </svg>
                    </button>
                    <button
                        class="w-16 h-16 rounded-full bg-gradient-to-b from-[#E58A5E] to-[#C96434] shadow-lg flex items-center justify-center text-white transform active:scale-95 transition-transform hover:shadow-xl hover:scale-105 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                            class="w-8 h-8 ml-1">
                            <path d="M8 5V19L19 12L8 5Z" />
                        </svg>
                    </button>
                    <button class="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
                            <path d="M5 3V21L16 12L5 3ZM19 3V21H22V3H19Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
