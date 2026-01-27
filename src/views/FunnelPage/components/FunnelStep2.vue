<script setup lang="ts">
import { useFunnelStore } from '../../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const store = useFunnelStore()
const { t } = useI18n()

const genres = ['pop', 'country', 'rock', 'rnb', 'jazz', 'worship', 'rap']
const genders = ['female', 'male', 'none']

const isValid = computed(() => {
    return store.answers.genre && store.answers.voiceGender
})

const handleNext = () => {
    if (isValid.value) {
        store.nextStep()
    }
}
</script>

<template>
    <div class="animate-fade-in-up">
        <!-- Header -->
        <div class="text-center mb-10">
            <h1 class="font-serif text-3xl md:text-4xl font-bold mb-3 text-text-main">
                {{ t('funnel.step2.title') }}
            </h1>
        </div>

        <!-- Question 1: Genre -->
        <div class="mb-10">
            <label class="block font-bold text-lg mb-4 text-text-main">
                {{ t('funnel.step2.question1') }} <span class="text-[#B2542B]">*</span>
            </label>
            <div class="flex flex-wrap gap-3">
                <button v-for="opt in genres" :key="opt" @click="store.setGenre(opt)"
                    class="px-6 py-2.5 rounded-full border-2 font-medium transition-all text-sm md:text-base cursor-pointer hover:border-[#B2542B]/30 hover:bg-[#B2542B]/5"
                    :class="[
                        store.answers.genre === opt
                            ? 'border-[#B2542B] bg-[#B2542B]/10 text-[#B2542B]'
                            : 'border-[#E5E0D6] bg-white text-text-main/80'
                    ]">
                    {{ t(`funnel.step2.options.${opt}`) }}
                </button>
            </div>
        </div>

        <!-- Question 2: Voice Gender -->
        <div class="mb-12">
            <label class="block font-bold text-lg mb-1 text-text-main">
                {{ t('funnel.step2.question2') }}
            </label>
            <p class="text-sm text-text-main/60 italic mb-4">
                {{ t('funnel.step2.tip') }}
            </p>
            <div class="flex flex-wrap gap-3">
                <button v-for="opt in genders" :key="opt" @click="store.setVoiceGender(opt)"
                    class="px-6 py-2.5 rounded-full border-2 font-medium transition-all text-sm md:text-base cursor-pointer hover:border-[#B2542B]/30 hover:bg-[#B2542B]/5"
                    :class="[
                        store.answers.voiceGender === opt
                            ? 'border-[#B2542B] bg-[#B2542B]/10 text-[#B2542B]'
                            : 'border-[#E5E0D6] bg-white text-text-main/80'
                    ]">
                    {{ t(`funnel.step2.genderOptions.${opt}`) }}
                </button>
            </div>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between pt-8 border-t border-[#E5E0D6]/50">
            <button @click="store.prevStep()"
                class="px-8 py-3 rounded-xl border border-[#E5E0D6] text-text-main/80 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                {{ t('funnel.navigation.back') }}
            </button>

            <button @click="handleNext"
                class="px-10 py-3 rounded-xl bg-[#B2542B] text-white font-bold hover:bg-[#964623] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                :disabled="!isValid">
                {{ t('funnel.navigation.next') }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
</template>
