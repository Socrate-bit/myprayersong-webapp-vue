import { defineStore } from 'pinia'
import posthog from 'posthog-js'
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
    isExpress: false,
    // future fields
  })

  // Navigation
  const nextStep = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value++
      posthog.capture('funnel_step_next', {
        from_step: currentStep.value - 1,
        to_step: currentStep.value,
        total_steps: totalSteps
      })
    }

  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
      posthog.capture('funnel_step_prev', {
        from_step: currentStep.value + 1,
        to_step: currentStep.value,
        total_steps: totalSteps
      })
    }
  }

  // Setters
  const setRecipient = (value: string) => {
    answers.value.recipient = value
    posthog.capture('funnel_answer', {
      field: 'recipient',
      value,
    })
  }

  const setRecipientName = (value: string) => {
    answers.value.recipientName = value
    posthog.capture('funnel_answer', {
      field: 'recipientName',
      value,
    })
  }

  const setGenre = (value: string) => {
    answers.value.genre = value
    posthog.capture('funnel_answer', {
      field: 'genre',
      value,
    })
  }

  const setVoiceGender = (value: string) => {
    answers.value.voiceGender = value
    posthog.capture('funnel_answer', {
      field: 'voiceGender',
      value,
    })
  }

  const setQualities = (value: string) => {
    answers.value.qualities = value
    posthog.capture('funnel_answer', {
      field: 'qualities',
      value,
    })
  }

  const setMemories = (value: string) => {
    answers.value.memories = value
    posthog.capture('funnel_answer', {
      field: 'memories',
      value,
    })
  }

  const setSpecialMessage = (value: string) => {
    answers.value.specialMessage = value
    posthog.capture('funnel_answer', {
      field: 'specialMessage',
      value,
    })
  }

  const setIsExpress = (value: boolean) => {
    answers.value.isExpress = value
    posthog.capture('funnel_answer', {
      field: 'isExpress',
      value,
    })
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
    setSpecialMessage,
    setIsExpress
  }
}, {
  persist: true
})
