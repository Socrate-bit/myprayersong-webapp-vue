<script setup lang="ts">
import { useFunnelStore } from '../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { SITE_NAME } from '@/constants'
import OrderSummary from './components/OrderSummary.vue'
import DiscountCard from './components/DiscountCard.vue'
import PaymentWhatYouGet from './components/PaymentWhatYouGet.vue'
import PaymentWhyChoose from './components/PaymentWhyChoose.vue'
import PaymentGuarantee from './components/PaymentGuarantee.vue'
import PaymentSocialProof from './components/PaymentSocialProof.vue'
import PaymentForm from './components/PaymentForm.vue'
import EditOrderModal from './components/EditOrderModal.vue'
const logo = '/En-tête.png'

import PaymentPix from './components/PaymentPix.vue'

const store = useFunnelStore()
const { t, locale } = useI18n()

// Modal state
const showEditModal = ref(false)

// Mock future date
const deliveryDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toLocaleDateString(locale.value, { day: 'numeric', month: 'long' })
})
</script>

<template>
  <!-- Header Logo -->
  <div class="w-full bg-secondary py-6 mb-8 flex justify-center">
    <img :src="logo" :alt="t('title', { siteName: SITE_NAME })" class="h-14 w-auto object-contain" />
  </div>

  <div class="min-h-screen bg-cream flex flex-col items-center px-4, pb-16">


    <!-- Header Content -->
    <div class="text-center max-w-2xl mb-8">
      <h1 class="font-serif text-3xl md:text-5xl font-bold mb-4 text-text-main">
        {{ t('payment.title') }}
      </h1>
      <p class="text-text-main/80 text-lg md:text-xl mb-8 leading-relaxed">
        {{ t('payment.subtitle', { name: store.answers.recipientName || t('payment.defaultLovedOne') }) }}
      </p>

      <!-- Date Badge -->
      <div class="inline-block bg-secondary text-white font-bold px-6 py-2 rounded-full shadow-md text-sm md:text-base">
        {{ t('payment.deliveryDate', { date: deliveryDate }) }}
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl px-4">

      <!-- Right Column: Form (Mobile Top, Desktop Right) -->
      <div class="order-1 lg:order-2 lg:col-span-1">
        <div class="sticky top-8">
          <PaymentForm />
          <PaymentPix class="mt-4" />
        </div>
      </div>

      <!-- Left Column: Info & Trust (Mobile Bottom, Desktop Left) -->
      <div class="order-2 lg:order-1 lg:col-span-1 space-y-8">
        <OrderSummary @open-edit="showEditModal = true" />
        <DiscountCard />
        <PaymentSocialProof />
        <PaymentGuarantee />
        <div class="lg:hidden">
          <PaymentForm />
          <PaymentPix class="mt-4" />
        </div>
        <PaymentWhatYouGet />
        <PaymentWhyChoose />
      </div>

    </div>

  </div>

  <!-- Edit Modal -->
  <EditOrderModal :is-open="showEditModal" @close="showEditModal = false" />
</template>
