<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SITE_NAME, SUPPORT_EMAIL } from '@/constants'

const { t } = useI18n()
const emailLink = `mailto:${SUPPORT_EMAIL}?subject=Meu Relato ${SITE_NAME}`
</script>

<template>
    <section
        class="py-12 md:py-24 px-4 bg-[var(--color-secondary)] flex flex-col items-center justify-center text-center">
        <h2 class="text-2xl md:text-5xl font-serif font-bold text-white mb-4">
            {{ t('reviewsPage.shareExperience.title', { siteName: SITE_NAME }) }}
        </h2>
        <p class="text-lg text-white/80 mb-12 max-w-2xl font-medium">
            {{ t('reviewsPage.shareExperience.subtitle') }}
        </p>

        <!-- Card -->
        <div
            class="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col items-center relative overflow-hidden group transition-all duration-500 hover:-translate-y-1">

            <!-- Background decoration -->
            <div
                class="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-primary)]/10 rounded-full blur-3xl group-hover:bg-[var(--color-primary)]/20 transition-colors duration-500">
            </div>
            <div
                class="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500">
            </div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col items-center">
                <!-- Heart Icon -->
                <div class="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-16 h-16 text-[var(--color-primary)]">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>

                <h3 class="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
                    {{ t('reviewsPage.shareExperience.card.title') }}
                </h3>

                <p class="text-white/90 mb-6 text-lg max-w-xl leading-relaxed">
                    {{ t('reviewsPage.shareExperience.card.text1', { email: SUPPORT_EMAIL }) }}
                </p>

                <p
                    class="text-white/70 mb-10 max-w-xl text-sm italic border-l-4 border-[var(--color-primary)] pl-4 text-left bg-white/5 p-4 rounded-r-lg">
                    {{ t('reviewsPage.shareExperience.card.text2', { siteName: SITE_NAME }) }}
                </p>

                <a :href="emailLink"
                    class="bg-[var(--color-primary)] text-black text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[var(--color-primary)]/90 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 group/btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-6 h-6 group-hover/btn:animate-bounce">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {{ t('reviewsPage.shareExperience.card.cta') }}
                </a>
            </div>
        </div>
    </section>
</template>
