<script setup lang="ts">
defineOptions({
  name: 'ReviewsPage'
})
import AppHeader from '../LandingPage/components/AppHeader.vue'
import PromoBanner from '../LandingPage/components/PromoBanner.vue'
import AppFooter from '../LandingPage/components/AppFooter.vue'
import ReviewsHero from './components/ReviewsHero.vue'
import ReviewsGrid from './components/ReviewsGrid.vue'
import ShareReview from './components/ShareReview.vue'
import FeaturesGuarantee from '../LandingPage/components/FeaturesGuarantee.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <PromoBanner />
    <AppHeader />
    <main class="flex-1">
      <ReviewsHero />
      <ReviewsGrid />
      <ShareReview />
      <FeaturesGuarantee />
    </main>
    <AppFooter />
  </div>
</template>
