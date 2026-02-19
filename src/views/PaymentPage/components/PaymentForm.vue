<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '../../../stores/funnel'
import { useI18n } from 'vue-i18n'
// import { db } from '../../../services/firebase'
// import { collection, addDoc } from 'firebase/firestore'
import { sha256 } from '../../../utils/crypto'
import HotmartModal from './HotmartModal.vue'

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

const store = useFunnelStore()
const { t } = useI18n()
const router = useRouter()

// Email state
const email = ref('')
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const isHotmartModalOpen = ref(false)
const hotmartModalRef = ref<InstanceType<typeof HotmartModal> | null>(null)

// No listeners needed for custom checkout

// Submit payment logic
const handlePayment = async () => {
  if (!email.value) {
    submitError.value = t('payment.emailRequiredError')
    return
  }

  if (!email.value.includes('@')) {
    submitError.value = t('payment.validEmailError')
    return
  }

  // Hash email for Pixel tracking
  const normalizedEmail = email.value.trim().toLowerCase()
  const hashedEmail = await sha256(normalizedEmail)

  // Save hashed email for Pixel tracking on success page
  localStorage.setItem('user_email_for_pixel', hashedEmail)

  // Track InitiateCheckout with email (Advanced Matching)
  if (window.fbq) {
    console.log('Tracking InitiateCheckout with email:', hashedEmail)
    window.fbq('set', 'userData', { em: hashedEmail })
    window.fbq('track', 'InitiateCheckout')
  }

  isSubmitting.value = true
  submitError.value = ''

  // Send order data to Firebase
  try {
    // const paymentData = {
    //   email: email.value,
    //   recipient: store.answers.recipient,
    //   recipientName: store.answers.recipientName,
    //   genre: store.answers.genre,
    //   voiceGender: store.answers.voiceGender,
    //   qualities: store.answers.qualities,
    //   memories: store.answers.memories,
    //   specialMessage: store.answers.specialMessage,
    //   createdAt: new Date().toISOString(),
    //   status: 'checkout'
    // }

    // Create initial document
    // const docRef = await addDoc(collection(db, 'payments'), paymentData)
    // const paymentId = docRef.id
    // currentPaymentId.value = paymentId
    // console.log('Payment ID:', currentPaymentId.value)

    // Open Custom Modal
    isHotmartModalOpen.value = true
    isSubmitting.value = false

  } catch (error) {
    console.error('Error initiating checkout:', error)
    submitError.value = t('payment.genericError')
    isSubmitting.value = false
  }
}

// Payment Handlers
const onPaymentSuccess = (data: { paymentId: string }) => {
  router.push({
    path: '/success',
    query: { payment_id: data.paymentId }
  })
}

const onPaymentError = (error: unknown) => {
  console.error('Payment Error:', error)
  submitError.value = t('payment.genericError')
  isHotmartModalOpen.value = false
}

// Expose handlePayment for parent execution if needed, although buttons are here
defineExpose({ handlePayment })
</script>

<template>
  <div class="bg-white rounded-3xl p-4 md:p-8 shadow-xl w-full border border-gray-100">
    <label class="block font-bold text-base md:text-lg mb-3 text-text-main">
      {{ t('payment.emailLabel') }}
    </label>
    <input v-model="email" type="email" :placeholder="t('payment.emailPlaceholder')"
      :disabled="isSubmitting || submitSuccess"
      class="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base md:text-lg transition-colors placeholder:text-gray-400 bg-gray-50 mb-2" />

    <!-- Error Message -->
    <p v-if="submitError" class="text-red-600 text-sm mb-4">{{ submitError }}</p>

    <!-- Success Message -->
    <p v-if="submitSuccess" class="text-green-600 text-sm font-bold mb-4">{{ t('payment.paymentSuccess') }}</p>

    <button @click="handlePayment" :disabled="isSubmitting || submitSuccess"
      class="w-full bg-primary hover:bg-primary-hover text-white text-lg md:text-xl font-bold py-3 md:py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 mb-6 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
      <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
      <svg v-else class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      {{ isSubmitting ? t('payment.generatingLink') : t('payment.cta') }}
    </button>

    <div class="flex items-center justify-center gap-2 text-secondary font-bold text-sm md:text-base">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
        class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ t('payment.guarantee') }}
    </div>

    <!-- Custom Checkout Modal (Replica) -->
    <HotmartModal ref="hotmartModalRef" :is-open="isHotmartModalOpen" :email="email" :name="store.answers.recipientName"
      @close="isHotmartModalOpen = false" @success="onPaymentSuccess" @error="onPaymentError" />
  </div>
</template>
