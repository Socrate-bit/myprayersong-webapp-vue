<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFunnelStore } from '../../../stores/funnel'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  isOpen: boolean
}>()

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const store = useFunnelStore()
const { t } = useI18n()

// Local state for editing form
const form = ref({
  recipient: store.answers.recipient,
  recipientName: store.answers.recipientName,
  genre: store.answers.genre,
  voiceGender: store.answers.voiceGender,
  qualities: store.answers.qualities,
  memories: store.answers.memories,
  specialMessage: store.answers.specialMessage
})

const options = [
  'husband', 'wife', 'boyfriend', 'girlfriend', 'children',
  'father', 'mother', 'sibling', 'friend', 'myself', 'other'
]

const genres = ['pop', 'country', 'rock', 'rnb', 'jazz', 'worship', 'rap']
const genders = ['female', 'male', 'none']

const handleSave = () => {
  store.setRecipient(form.value.recipient)
  store.setRecipientName(form.value.recipientName)
  store.setGenre(form.value.genre)
  store.setVoiceGender(form.value.voiceGender)
  store.setQualities(form.value.qualities)
  store.setMemories(form.value.memories)
  store.setSpecialMessage(form.value.specialMessage)
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="emit('close')"></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <h2 class="text-2xl font-serif font-bold text-text-main">{{ t('payment.summary.review') }}</h2>
        <button @click="emit('close')" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-6 h-6 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Scrollable Form -->
      <div class="p-8 overflow-y-auto custom-scrollbar space-y-8">

        <!-- Recipient & Name -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-bold text-sm mb-2 text-text-main">{{ t('funnel.step1.question1')
              }}</label>
            <select v-model="form.recipient"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-gray-50">
              <option v-for="opt in options" :key="opt" :value="opt">{{ t(`funnel.step1.options.${opt}`)
                }}</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-sm mb-2 text-text-main">{{ t('funnel.step1.question2')
              }}</label>
            <input v-model="form.recipientName" type="text"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-gray-50" />
          </div>
        </div>

        <!-- Genre & Voice -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-bold text-sm mb-2 text-text-main">{{ t('funnel.step2.question1')
              }}</label>
            <select v-model="form.genre"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-gray-50">
              <option v-for="opt in genres" :key="opt" :value="opt">{{ t(`funnel.step2.options.${opt}`) }}
              </option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-sm mb-2 text-text-main">{{ t('funnel.step2.question2')
              }}</label>
            <select v-model="form.voiceGender"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-gray-50">
              <option v-for="opt in genders" :key="opt" :value="opt">{{
                t(`funnel.step2.genderOptions.${opt}`) }}</option>
            </select>
          </div>
        </div>

        <!-- Qualities -->
        <div>
          <label class="block font-bold text-sm mb-2 text-text-main">{{ t('funnel.step3.question') }}</label>
          <textarea v-model="form.qualities" rows="3"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-gray-50 resize-none"></textarea>
        </div>

        <!-- Memories -->
        <div>
          <label class="block font-bold text-sm mb-2 text-text-main">{{ t('funnel.step4.question') }}</label>
          <textarea v-model="form.memories" rows="3"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-gray-50 resize-none"></textarea>
        </div>

        <!-- Special Message -->
        <div>
          <label class="block font-bold text-sm mb-2 text-text-main">{{ t('funnel.step5.question') }}</label>
          <textarea v-model="form.specialMessage" rows="3"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none bg-gray-50 resize-none"></textarea>
        </div>

      </div>

      <!-- Footer -->
      <div class="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
        <button @click="emit('close')"
          class="px-6 py-2.5 rounded-xl font-bold text-text-main/60 hover:bg-gray-200/50 transition-colors">
          {{ t('common.cancel') }}
        </button>
        <button @click="handleSave"
          class="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]">
          {{ t('common.save') }}
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
</style>
