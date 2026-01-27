<script setup lang="ts">
import { useFunnelStore } from '../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { db } from '../../services/firebase'
import { collection, addDoc } from 'firebase/firestore'
import OrderSummary from './components/OrderSummary.vue'
import DiscountCard from './components/DiscountCard.vue'
import PaymentWhatYouGet from './components/PaymentWhatYouGet.vue'
import PaymentWhyChoose from './components/PaymentWhyChoose.vue'
import PaymentGuarantee from './components/PaymentGuarantee.vue'
import PaymentSocialProof from './components/PaymentSocialProof.vue'

const store = useFunnelStore()
const { t } = useI18n()

// Email state
const email = ref('')
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

// Mock future date
const deliveryDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

// Submit payment
const handlePayment = async () => {
  if (!email.value) {
    submitError.value = 'Please enter your email'
    return
  }

  if (!email.value.includes('@')) {
    submitError.value = 'Please enter a valid email'
    return
  }

  isSubmitting.value = true
  submitError.value = ''

  try {
    const paymentData = {
      email: email.value,
      recipient: store.answers.recipient,
      recipientName: store.answers.recipientName,
      genre: store.answers.genre,
      voiceGender: store.answers.voiceGender,
      qualities: store.answers.qualities,
      memories: store.answers.memories,
      specialMessage: store.answers.specialMessage,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }

    await addDoc(collection(db, 'payments'), paymentData)

    submitSuccess.value = true
    console.log('Payment data saved successfully')
  } catch (error) {
    console.error('Error saving payment:', error)
    submitError.value = 'An error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-cream flex flex-col items-center py-12 px-4">
    <!-- Header -->
    <div class="text-center max-w-2xl mb-8">
      <h1 class="font-serif text-3xl md:text-5xl font-bold mb-4 text-text-main">
        {{ t('payment.title') }}
      </h1>
      <p class="text-text-main/80 text-lg md:text-xl mb-8 leading-relaxed">
        {{ t('payment.subtitle', { name: store.answers.recipientName || 'your loved one' }) }}
      </p>

      <!-- Date Badge -->
      <div class="inline-block bg-[#A05E35] text-white font-bold px-6 py-2 rounded-full shadow-md text-sm md:text-base">
        {{ t('payment.deliveryDate', { date: deliveryDate }) }}
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">

      <!-- Left Column: Form & Info -->
      <div class="lg:col-span-2">
        <!-- Email Card -->
        <div class="bg-white rounded-3xl p-6 md:p-8 shadow-xl w-full border border-gray-100 mb-8">
          <label class="block font-bold text-lg mb-3 text-text-main">
            {{ t('payment.emailLabel') }}
          </label>
          <input v-model="email" type="email" :placeholder="t('payment.emailPlaceholder')"
            :disabled="isSubmitting || submitSuccess"
            class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#B2542B] focus:ring-0 outline-none text-lg transition-colors placeholder:text-gray-400 bg-gray-50 mb-2" />

          <!-- Error Message -->
          <p v-if="submitError" class="text-red-600 text-sm mb-4">{{ submitError }}</p>

          <!-- Success Message -->
          <p v-if="submitSuccess" class="text-green-600 text-sm font-bold mb-4">✓ Payment request submitted
            successfully!</p>

          <button @click="handlePayment" :disabled="isSubmitting || submitSuccess"
            class="w-full bg-[#B2542B] hover:bg-[#964623] text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 mb-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            {{ t('payment.cta') }}
          </button>

          <div class="flex items-center justify-center gap-2 text-[#468C5D] font-bold text-sm md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t('payment.guarantee') }}
          </div>
        </div>

        <!-- Social Proof Section -->
        <PaymentSocialProof />

        <!-- Guarantee Section -->
        <PaymentGuarantee />

        <!-- Bottom CTA -->
        <div class="text-center mt-8 mb-12">
          <button @click="handlePayment" :disabled="isSubmitting || submitSuccess"
            class="w-full bg-[#B2542B] hover:bg-[#964623] text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 mb-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span v-if="!isSubmitting">{{ t('payment.cta') }}</span>
            <span v-else>Processing...</span>
          </button>
          <p class="text-text-main/70 font-medium">Ready to create something special for {{ store.answers.recipientName
            || 'your loved one' }}?</p>
        </div>
      </div>

      <!-- Right Column: Summary & Trust -->
      <div class="lg:col-span-1 space-y-6">
        <OrderSummary />
        <DiscountCard />
        <PaymentWhatYouGet />
        <PaymentWhyChoose />
      </div>

    </div>
  </div>
</template>
