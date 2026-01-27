<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

// Retrieve the questions array from i18n
const faqItems = tm('faq.questions') as Array<{ q: string, a: string }>

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
    <section class="py-24 px-4 bg-cream flex flex-col items-center">
        <h2 class="font-serif text-3xl md:text-5xl font-bold mb-16 text-text-main text-center">
            {{ $t('faq.title') }}
        </h2>

        <div class="max-w-3xl w-full">
            <div v-for="(item, index) in faqItems" :key="index" class="border-b border-[#E5E0D6] last:border-b-0">
                <button @click="toggle(index)"
                    class="w-full flex items-center justify-between py-6 text-left focus:outline-none group cursor-pointer">
                    <span
                        class="font-serif text-lg md:text-xl font-medium text-text-main group-hover:text-primary transition-colors">
                        {{ item.q }}
                    </span>
                    <span class="ml-4 flex-shrink-0 text-text-main group-hover:text-primary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-5 h-5 transition-transform duration-300 transform"
                            :class="{ 'rotate-45': openIndex === index }">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </span>
                </button>
                <div class="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                    :style="{ maxHeight: openIndex === index ? '200px' : '0px' }">
                    <p class="pb-6 text-text-main/80 leading-relaxed">
                        {{ item.a }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
