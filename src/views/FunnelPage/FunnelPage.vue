<script setup lang="ts">
import FunnelProgress from './components/FunnelProgress.vue'
import FunnelStep1 from './components/FunnelStep1.vue'
import FunnelStep2 from './components/FunnelStep2.vue'
import FunnelStep3 from './components/FunnelStep3.vue'
import FunnelStep4 from './components/FunnelStep4.vue'
import FunnelStep5 from './components/FunnelStep5.vue'
import { useFunnelStore } from '../../stores/funnel'

const store = useFunnelStore()
</script>

<template>
    <div class="min-h-screen bg-cream flex flex-col">
        <!-- Simple Header -->
        <header class="py-6 flex justify-center border-b border-[#E5E0D6]/50">
            <div class="text-2xl font-serif italic font-bold tracking-tight">
                PrayerSong
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
            <FunnelProgress />

            <!-- Dynamic Step Rendering -->
            <transition name="fade" mode="out-in">
                <component :is="store.currentStep === 1 ? FunnelStep1 :
                    store.currentStep === 2 ? FunnelStep2 :
                        store.currentStep === 3 ? FunnelStep3 :
                            store.currentStep === 4 ? FunnelStep4 :
                                store.currentStep === 5 ? FunnelStep5 : 'div'" />
            </transition>
        </main>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
