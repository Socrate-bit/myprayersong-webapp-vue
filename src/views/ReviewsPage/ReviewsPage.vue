<script setup lang="ts">
import AppHeader from '../LandingPage/components/AppHeader.vue'
import AppFooter from '../LandingPage/components/AppFooter.vue'
import ReviewsHero from './components/ReviewsHero.vue'
import ReviewsGrid from './components/ReviewsGrid.vue'
import ReviewsCTA from './components/ReviewsCTA.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <AppHeader />
        <main class="flex-1">
            <ReviewsHero />
            <ReviewsGrid />
            <ReviewsCTA />
        </main>
        <AppFooter />
    </div>
</template>
