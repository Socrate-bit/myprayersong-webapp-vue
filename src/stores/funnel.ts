import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFunnelStore = defineStore('funnel', () => {
  const currentStep = ref(1)
  const totalSteps = 5

  const answers = ref({
    recipient: '',
    recipientName: '',
    genre: '',
    voiceGender: '',
    qualities: '',
    memories: '',
    specialMessage: '',
    // future fields
  })

  // Navigation
  const nextStep = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  // Setters
  const setRecipient = (value: string) => {
    answers.value.recipient = value
  }

  const setRecipientName = (value: string) => {
    answers.value.recipientName = value
  }

  const setGenre = (value: string) => {
    answers.value.genre = value
  }

  const setVoiceGender = (value: string) => {
    answers.value.voiceGender = value
  }

  const setQualities = (value: string) => {
    answers.value.qualities = value
  }

  const setMemories = (value: string) => {
    answers.value.memories = value
  }

  const setSpecialMessage = (value: string) => {
    answers.value.specialMessage = value
  }

  return {
    currentStep,
    totalSteps,
    answers,
    nextStep,
    prevStep,
    setRecipient,
    setRecipientName,
    setGenre,
    setVoiceGender,
    setQualities,
    setMemories,
    setSpecialMessage
  }
})
