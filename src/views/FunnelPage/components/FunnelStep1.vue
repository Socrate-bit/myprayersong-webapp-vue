<script setup lang="ts">
import { useFunnelStore } from '../../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useFunnelStore()
const { t } = useI18n()
const router = useRouter()

const options = [
  'husband', 'wife', 'boyfriend', 'girlfriend', 'children',
  'father', 'mother', 'sibling', 'friend', 'myself', 'other'
]

const isValid = computed(() => {
  return store.answers.recipient && store.answers.recipientName.length > 0
})

const handleNext = () => {
  if (isValid.value) {
    store.nextStep()
  }
}

const handleBack = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="animate-fade-in-up">
    <!-- Header -->
    <div class="text-center mb-6 md:mb-10">
      <h1 class="font-serif text-2xl md:text-3xl font-bold mb-2 text-text-main">
        {{ t('funnel.step1.title') }}
      </h1>
      <p class="text-text-main/70 text-sm md:text-lg">
        {{ t('funnel.step1.subtitle') }}
      </p>
    </div>

    <!-- Question 1: Who's this for? -->
    <div class="mb-6 md:mb-10">
      <label class="block font-bold text-base md:text-lg mb-3 text-text-main">
        {{ t('funnel.step1.question1') }} <span class="text-secondary">*</span>
      </label>
      <div class="flex flex-wrap gap-2 md:gap-3">
        <button v-for="opt in options" :key="opt" @click="store.setRecipient(opt)"
          class="px-4 py-2 md:px-6 md:py-2.5 rounded-full border-2 font-medium transition-all text-xs md:text-base cursor-pointer hover:border-secondary/30 hover:bg-secondary/5"
          :class="[
            store.answers.recipient === opt
              ? 'border-secondary bg-secondary/10 text-secondary'
              : 'border-[#E5E0D6] bg-white text-text-main/80'
          ]">
          {{ t(`funnel.step1.options.${opt}`) }}
        </button>
      </div>
    </div>

    <!-- Question 2: Name -->
    <div class="mb-8 md:mb-12">
      <label class="block font-bold text-base md:text-lg mb-3 text-text-main">
        {{ t('funnel.step1.question2') }}
      </label>
      <input v-model="store.answers.recipientName" type="text" :placeholder="t('funnel.step1.placeholder')"
        class="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl border-2 border-[#E5E0D6] focus:border-secondary focus:ring-0 outline-none text-base md:text-lg transition-colors placeholder:text-gray-400 bg-white"
        @input="store.setRecipientName(($event.target as HTMLInputElement).value)" />
      <p class="mt-2 text-xs md:text-sm text-text-main/60 italic">
        {{ t('funnel.step1.tip') }}
      </p>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-6 md:pt-8 border-t border-[#E5E0D6]/50">
      <button @click="handleBack"
        class="px-4 py-2.5 md:px-8 md:py-3 rounded-xl border border-[#E5E0D6] text-text-main/80 text-sm md:text-base font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {{ t('funnel.navigation.back') }}
      </button>
      <button @click="handleNext"
        class="px-6 py-2.5 md:px-10 md:py-3 rounded-xl bg-primary text-white text-sm md:text-base font-bold hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        :disabled="!isValid">
        {{ t('funnel.navigation.next') }}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
    <!-- Footer Links -->
    <div class="mt-8 md:mt-12 text-center text-[10px] md:text-xs text-text-main/40">
      {{ t('funnel.footer.text') }} <a href="#" class="underline">{{ t('funnel.footer.terms') }}</a> & <a href="#"
        class="underline">{{ t('funnel.footer.privacy') }}</a>.
    </div>
  </div>
</template>
