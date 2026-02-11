<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const retryPayment = () => {
  router.push('/payment')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-outfit">
    <div
      class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all hover:scale-[1.01]">
      <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 class="mb-4 text-2xl font-bold text-gray-900">{{ t('failure.title') }}</h1>
      <p class="mb-8 text-gray-600 leading-relaxed">
        {{ t('failure.subtitle') }}
      </p>
      <button @click="retryPayment"
        class="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        {{ t('failure.button') }}
      </button>
    </div>
  </div>
</template>
