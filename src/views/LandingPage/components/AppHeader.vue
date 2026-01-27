<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <header class="flex items-center justify-between px-8 py-5 max-w-[1400px] mx-auto w-full">
        <!-- Logo -->
        <div class="text-2xl font-serif italic font-bold tracking-tight">
            PrayerSong
        </div>

        <!-- Navigation & CTA -->
        <nav class="flex items-center gap-8">
            <a href="#" class="text-text-main hover:text-primary transition-colors font-medium">
                {{ t('header.trackOrder') }}
            </a>
            <a href="#" class="text-text-main hover:text-primary transition-colors font-medium">
                {{ t('header.reviews') }}
            </a>
            <button @click="$router.push('/funnel')"
                class="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer">
                {{ t('header.createSong') }}
            </button>
        </nav>
    </header>
</template>
