<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFunnelStore } from '@/stores/funnel'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const store = useFunnelStore()

onMounted(() => {
  const sessionId = route.query.session_id as string
  if (!sessionId) return

  const trackedKey = `purchase_tracked_${sessionId}`
  if (localStorage.getItem(trackedKey)) {
    return
  }

  if (window.fbq) {
    console.log('purchase logged')
    window.fbq('track', 'Purchase', {
      content_name: 'Custom Prayer Song',
      content_type: 'product',
      value: store.answers.isExpress ? 238.00 : 159.00,
      currency: 'BRL'
    }, {
      eventID: sessionId
    })

    localStorage.setItem(trackedKey, 'true')
  }
})

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-outfit">
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all hover:scale-[1.01]">
      <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 class="mb-4 text-2xl font-bold text-gray-900">{{ t('success.title') }}</h1>
      <p class="mb-8 text-gray-600 leading-relaxed">
        {{ t('success.subtitle') }}
      </p>
      <button @click="goToHome"
        class="inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
        {{ t('success.button') }}
      </button>
    </div>
  </div>
</template>
