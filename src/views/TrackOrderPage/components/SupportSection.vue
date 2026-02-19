<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORT_EMAIL } from '@/constants'
const { t } = useI18n()
</script>

<template>
    <section class="mt-10 md:mt-20 text-center max-w-2xl mx-auto px-4">
        <h2 class="font-serif text-2xl md:text-3xl font-bold text-[color:var(--color-text-main)] mb-6">{{
            t('trackOrder.help.title')
            }}</h2>
        <p class="text-gray-600 mb-8 md:mb-10 leading-relaxed text-base md:text-lg">
            {{ t('trackOrder.help.text', { email: SUPPORT_EMAIL }) }}
        </p>
        <a :href="`mailto:${SUPPORT_EMAIL}`"
            class="inline-block bg-gray-100 hover:bg-gray-200 text-[color:var(--color-text-main)] font-semibold py-3 px-8 md:py-4 md:px-10 rounded-xl transition-colors cursor-pointer text-base md:text-lg">
            {{ t('trackOrder.help.button') }}
        </a>
    </section>
</template>
