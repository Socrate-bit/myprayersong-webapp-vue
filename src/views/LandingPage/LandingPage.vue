<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import MainValueProposition from './components/MainValueProposition.vue'
import HowItWorks from './components/HowItWorks.vue'
import TestimonialCarousel from './components/TestimonialCarousel.vue'
import GiftGrid from './components/GiftGrid.vue'
import ProductPreview from './components/ProductPreview.vue'
import FeaturesGuarantee from './components/FeaturesGuarantee.vue'
import FAQSection from './components/FAQSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <AppHeader />
        <main class="flex-1 flex flex-col gap-[var(--spacing-section-gap)]">
            <HeroSection />
            <MainValueProposition />
            <HowItWorks />
            <TestimonialCarousel />
            <GiftGrid />
            <ProductPreview />
            <FeaturesGuarantee />
            <FAQSection />
        </main>
        <AppFooter />
    </div>
</template>
