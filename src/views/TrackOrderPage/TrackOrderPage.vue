<script setup lang="ts">
import AppHeader from '@/views/LandingPage/components/AppHeader.vue'
import OrderGuarantee from './components/OrderGuarantee.vue'
import OrderTrackingForm from './components/OrderTrackingForm.vue'
import SupportSection from './components/SupportSection.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[color:var(--color-cream)]">
    <AppHeader />

    <main class="flex-grow pt-20 pb-32 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="font-serif text-5xl md:text-6xl font-bold text-[color:var(--color-text-main)] mb-8 tracking-tight">
          {{ t('trackOrder.title') }}
        </h1>
        <p class="text-xl text-gray-600 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
          {{ t('trackOrder.subtitle') }}
        </p>

        <div class="max-w-3xl mx-auto w-full">
          <OrderGuarantee />
          <OrderTrackingForm />
        </div>

        <SupportSection />
      </div>
    </main>
  </div>
</template>
