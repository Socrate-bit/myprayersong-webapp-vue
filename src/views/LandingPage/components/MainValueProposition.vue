<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <section class="flex flex-col items-center py-16 px-4 text-center max-w-4xl mx-auto">
        <!-- Top Badge -->
        <div class="tracking-widest text-xs font-bold text-text-main/70 uppercase mb-6">
            {{ t('valueProp.badge') }}
        </div>

        <!-- Headline -->
        <h1 class="font-serif text-5xl md:text-6xl font-bold text-text-main mb-6 leading-tight">
            {{ t('valueProp.headline') }}
        </h1>

        <!-- Subheadline -->
        <p class="font-sans text-lg md:text-xl text-text-main/80 mb-10 max-w-2xl">
            {{ t('valueProp.subheadline') }}
        </p>

        <!-- CTA Button -->
        <button @click="$router.push('/funnel')"
            class="bg-primary hover:bg-primary-hover text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 mb-4 flex items-center gap-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            {{ t('valueProp.cta') }}
        </button>

        <!-- Delivery Text -->
        <p class="font-serif italic text-text-main/70 mb-10 text-sm">
            {{ t('valueProp.delivery') }}
        </p>

        <!-- Social Proof -->
        <div class="flex flex-col items-center gap-3">
            <!-- Stars -->
            <div class="flex gap-1 text-[#CBA175]">
                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-6 h-6">
                    <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd" />
                </svg>
            </div>

            <!-- Avatars & Count -->
            <div class="flex items-center gap-4">
                <div class="flex -space-x-4">
                    <div v-for="i in 4" :key="i"
                        class="w-10 h-10 rounded-full border-2 border-cream bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-500 overflow-hidden">
                        <!-- Placeholder for avatar -->
                        <div class="w-full h-full bg-gray-300"></div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-full border-2 border-cream bg-[#CBA175] flex items-center justify-center text-xs font-bold text-white z-10">
                        +998
                    </div>
                </div>
            </div>

            <!-- Loved By Text -->
            <p class="text-text-main/80 font-medium">
                {{ t('valueProp.lovedBy') }}
            </p>
        </div>
    </section>
</template>
