<script setup lang="ts">
import { useFunnelStore } from '../../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const store = useFunnelStore()
const { t } = useI18n()

const isValid = computed(() => {
    return store.answers.qualities.length >= 10 // Min length validation
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
                {{ t('funnel.step3.title') }}
            </h1>
            <p class="text-text-main/70 text-lg">
                {{ t('funnel.step3.subtitle') }}
            </p>
        </div>

        <!-- Question: Qualities -->
        <div class="mb-12">
            <label class="block font-bold text-lg mb-4 text-text-main">
                {{ t('funnel.step3.question') }}
            </label>
            <textarea v-model="store.answers.qualities" :placeholder="t('funnel.step3.placeholder')" rows="6"
                class="w-full px-6 py-4 rounded-xl border-2 border-[#E5E0D6] focus:border-secondary focus:ring-0 outline-none text-lg transition-colors placeholder:text-gray-400 bg-white resize-none"
                @input="store.setQualities(($event.target as HTMLTextAreaElement).value)"></textarea>
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
                class="px-10 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
