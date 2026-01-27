<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <section class="flex flex-col items-center pt-8 pb-16 px-4">
        <!-- Main Video/Image Container -->
        <div class="relative w-full max-w-[900px] aspect-video rounded-3xl overflow-hidden shadow-xl bg-gray-200">
            <!-- Placeholder for the main visual -->
            <div class="absolute inset-0 flex items-center justify-center text-gray-400">
                [Main Video/Image Placeholder]
            </div>

            <!-- Timestamp Badge -->
            <div class="absolute top-6 left-6 bg-black/40 text-white/90 px-3 py-1 rounded-md text-sm backdrop-blur-sm">
                1.00
            </div>

            <!-- Listen Button Overlay -->
            <div class="absolute bottom-6 right-6">
                <button
                    class="flex items-center gap-3 bg-white/90 hover:bg-white backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg transition-all cursor-pointer group">
                    <div
                        class="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="w-4 h-4 text-white ml-0.5">
                            <path fill-rule="evenodd"
                                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <span class="font-semibold text-text-main text-sm">{{ t('hero.listenExample') }}</span>
                </button>
            </div>
        </div>

        <!-- Bottom Badge -->
        <div class="mt-10 tracking-widest text-xs font-bold text-text-main/80 uppercase">
            {{ t('hero.badge') }}
        </div>
    </section>
</template>
