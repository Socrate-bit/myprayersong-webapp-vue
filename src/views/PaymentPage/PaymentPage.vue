<script setup lang="ts">
import { useFunnelStore } from '../../stores/funnel'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { SITE_NAME, LOGO_URL } from '@/constants'
import OrderSummary from './components/OrderSummary.vue'
import DiscountCard from './components/DiscountCard.vue'
import PaymentWhatYouGet from './components/PaymentWhatYouGet.vue'
import PaymentWhyChoose from './components/PaymentWhyChoose.vue'
import PaymentGuarantee from './components/PaymentGuarantee.vue'
import PaymentSocialProof from './components/PaymentSocialProof.vue'
import PaymentForm from './components/PaymentForm.vue'
import EditOrderModal from './components/EditOrderModal.vue'
import PaymentAuthority from './components/PaymentAuthority.vue'
const logo = LOGO_URL

import ReviewsGrid from '../ReviewsPage/components/ReviewsGrid.vue'
// import PaymentPix from './components/PaymentPix.vue'

const store = useFunnelStore()
const { t, locale } = useI18n()

// Modal state
const showEditModal = ref(false)

// Mock future date
const deliveryDate = computed(() => {
  const date = new Date()
  const daysToAdd = store.answers.isExpress ? 1 : 7
  date.setDate(date.getDate() + daysToAdd)
  return date.toLocaleDateString(locale.value, { day: 'numeric', month: 'long' })
})
</script>

<template>
  <!-- Header Logo -->
  <div class="w-full bg-secondary py-3 md:py-6 mb-4 md:mb-8 flex justify-center">
    <router-link to="/">
      <img :src="logo" :alt="t('title', { siteName: SITE_NAME })"
        class="h-8 md:h-14 w-auto object-contain cursor-pointer" />
    </router-link>
  </div>

  <div class="min-h-screen bg-cream flex flex-col items-center pb-8 md:pb-16">

    <!-- Header Content -->
    <div class="text-center max-w-2xl px-4 mb-4 md:mb-8 mt-4 md:mt-8">
      <h1 class="font-serif text-2xl md:text-5xl font-bold mb-2 md:mb-4 text-text-main">
        {{ t('payment.title') }}
      </h1>
      <p class="text-text-main/80 text-base md:text-xl mb-4 md:mb-8 leading-relaxed">
        {{ t('payment.subtitle', { name: store.answers.recipientName || t('payment.defaultLovedOne') }) }}
      </p>

      <!-- Date Badge -->
      <div
        class="inline-block bg-secondary text-white font-bold px-4 py-1.5 md:px-6 md:py-2 mb-2 rounded-full shadow-md text-xs md:text-base transition-all duration-300">
        {{ t('payment.deliveryDate', { date: deliveryDate }) }}
        <span v-if="store.answers.isExpress"
          class="ml-1 text-yellow-300 text-xs uppercase tracking-wider font-extrabold">(Express)</span>
      </div>
    </div>

    <!-- Order Summary (mobile only, top of page) -->
    <div class="lg:hidden w-full max-w-6xl px-4">
      <OrderSummary @open-edit="showEditModal = true" />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full max-w-6xl px-4 mb-16">

      <!-- Right Column: Form (Mobile Top, Desktop Right) -->
      <div class="order-1 lg:order-2 lg:col-span-1">
        <div class="sticky top-8">
          <PaymentForm />
          <!-- <PaymentPix class="mt-2 md:mt-4" /> -->
        </div>
      </div>

      <!-- Left Column: Info & Trust (Mobile Bottom, Desktop Left) -->
      <div class="order-2 lg:order-1 lg:col-span-1 space-y-4 md:space-y-8">
        <div class="hidden lg:block">
          <OrderSummary @open-edit="showEditModal = true" />
        </div>
        <DiscountCard />
        <PaymentAuthority />
        <PaymentSocialProof />
        <PaymentGuarantee />
        <div class="lg:hidden">
          <PaymentForm />
          <!-- <PaymentPix class="mt-2 md:mt-4" /> -->
        </div>

        <PaymentWhatYouGet />
        <PaymentWhyChoose />
      </div>

    </div>

    <!-- Reviews Grid -->
    <div class="w-full pt-16 max-w-7xl mx-auto border-t border-gray-200">
      <div class="px-4">
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-text-main">
          {{ t('testimonials.title', { siteName: SITE_NAME }) }}
        </h2>
      </div>
      <ReviewsGrid />
    </div>

  </div>

  <!-- Edit Modal -->
  <EditOrderModal :is-open="showEditModal" @close="showEditModal = false" />
</template>
