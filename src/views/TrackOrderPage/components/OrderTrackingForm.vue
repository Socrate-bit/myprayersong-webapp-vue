<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { db } from '../../../services/firebase'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'

const { t, locale } = useI18n()

const email = ref('')
const isLoading = ref(false)
const error = ref(false)
const orderStatus = ref<null | { status: string, date: string, recipient: string }>(null)
const showPopup = ref(false)

const checkOrderStatus = async () => {
  if (!email.value) return

  isLoading.value = true
  error.value = false
  orderStatus.value = null
  showPopup.value = false

  try {
    const paymentsRef = collection(db, 'payments')
    // Query for payments with this email
    // We order by createdAt desc to get the most recent one if multiple exist
    const q = query(
      paymentsRef,
      where('email', '==', email.value.trim()),
      orderBy('createdAt', 'desc'),
      limit(1)
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = querySnapshot.docs[0]?.data() as any
      // Map the status to something user friendly
      const statusMap: Record<string, string> = {
        'checkout': t('trackOrder.status.checkout'),
        'pending': t('trackOrder.status.pending'),
        'processing': t('trackOrder.status.processing'),
        'completed': t('trackOrder.status.completed')
      }

      orderStatus.value = {
        status: statusMap[doc.status] || doc.status || t('trackOrder.status.processing'),
        date: doc.createdAt ? new Date(doc.createdAt).toLocaleDateString(locale.value) : 'N/A',
        recipient: doc.recipientName || t('payment.defaultLovedOne')
      }
      showPopup.value = true
    } else {
      // No order found
      error.value = true
      // Shake effect logic could go here if we want to get fancy,
      // but for now the red border (handled by template class binding) gives visual feedback
    }
  } catch (err) {
    console.error('Error fetching order:', err)
    error.value = true
  } finally {
    isLoading.value = false
  }
}

const closePopup = () => {
  showPopup.value = false
  orderStatus.value = null
  email.value = ''
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-black/5 p-5 md:p-10 mt-6 md:mt-8 relative">
    <div class="flex flex-col gap-4">
      <input type="email" v-model="email" @keyup.enter="checkOrderStatus"
        :placeholder="t('trackOrder.form.placeholder')"
        :class="{ '!border-red-500 !ring-red-200 focus:!border-red-500 focus:!ring-red-200': error }"
        class="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl border border-gray-200 text-base md:text-lg placeholder:text-gray-400 focus:outline-none focus:border-[color:var(--color-secondary)] focus:ring-1 focus:ring-[color:var(--color-secondary)] bg-gray-50 transition-all" />

      <p v-if="error" class="text-red-500 text-sm ml-2 -mt-2">
        {{ t('trackOrder.form.notFound') }}
      </p>

      <button @click="checkOrderStatus" :disabled="isLoading"
        class="w-full bg-secondary hover:bg-secondary-hover text-white font-bold py-3 px-6 md:py-4 rounded-xl text-base md:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md duration-200 disabled:opacity-70 disabled:cursor-not-allowed">
        <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        {{ isLoading ? t('trackOrder.form.checking') : t('trackOrder.form.button') }}
      </button>
    </div>

    <!-- Order Status Popup Modal -->
    <Teleport to="body">
      <div v-if="showPopup" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closePopup"></div>

        <!-- Content -->
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 transform transition-all scale-100">
          <button @click="closePopup"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ t('trackOrder.popup.title') }}</h3>
            <p class="text-gray-600 mb-6">
              {{ t('trackOrder.popup.songFor', { name: orderStatus?.recipient }) }}
            </p>

            <div class="bg-gray-50 rounded-xl p-4 text-left border border-gray-100 mb-8">
              <div class="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                <span class="text-gray-500 text-sm">{{ t('trackOrder.popup.orderDate') }}</span>
                <span class="font-medium text-gray-900">{{ orderStatus?.date }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">{{ t('trackOrder.popup.status') }}</span>
                <span
                  class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-700">
                  {{ orderStatus?.status }}
                </span>
              </div>
            </div>

            <button @click="closePopup"
              class="w-full bg-secondary hover:bg-secondary-hover text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform active:scale-95">
              {{ t('trackOrder.popup.close') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
