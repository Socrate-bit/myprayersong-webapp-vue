<script setup lang="ts">
import { ref } from 'vue'
import { useFunnelStore } from '../../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { db, functions } from '../../../services/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { sha256 } from '../../../utils/crypto'

const store = useFunnelStore()
const { t } = useI18n()

// Email state
const email = ref('')
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

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
            status: 'checkout'
        }

        // Create initial document
        const docRef = await addDoc(collection(db, 'payments'), paymentData)

        // Call the Firebase Function to create a Stripe Checkout Session
        const createStripeCheckout = httpsCallable(functions, 'createStripeCheckout')
        const result = await createStripeCheckout({
            email: email.value,
            recipientName: store.answers.recipientName,
            isExpress: store.answers.isExpress || false, // Pass express flag
            origin: window.location.origin,
            paymentId: docRef.id
        })

        const data = result.data as { url: string }

        if (data.url) {
            // Redirect to Stripe Checkout
            window.location.href = data.url
        } else {
            throw new Error('No checkout URL returned')
        }

    } catch (error) {
        console.error('Error creating checkout session:', error)
        submitError.value = t('payment.genericError')
        isSubmitting.value = false // Only reset if error, otherwise we are redirecting
    }
}

// Expose handlePayment for parent execution if needed, although buttons are here
defineExpose({ handlePayment })
</script>

<template>
    <div class="bg-white rounded-3xl p-6 md:p-8 shadow-xl w-full border border-gray-100">
        <label class="block font-bold text-lg mb-3 text-text-main">
            {{ t('payment.emailLabel') }}
        </label>
        <input v-model="email" type="email" :placeholder="t('payment.emailPlaceholder')"
            :disabled="isSubmitting || submitSuccess"
            class="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-lg transition-colors placeholder:text-gray-400 bg-gray-50 mb-2" />

        <!-- Error Message -->
        <p v-if="submitError" class="text-red-600 text-sm mb-4">{{ submitError }}</p>

        <!-- Success Message -->
        <p v-if="submitSuccess" class="text-green-600 text-sm font-bold mb-4">{{ t('payment.paymentSuccess') }}</p>

        <button @click="handlePayment" :disabled="isSubmitting || submitSuccess"
            class="w-full bg-primary hover:bg-primary-hover text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 mb-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            {{ t('payment.cta') }}
        </button>

        <div class="flex items-center justify-center gap-2 text-secondary font-bold text-sm md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ t('payment.guarantee') }}
        </div>
    </div>
</template>
