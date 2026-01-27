<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <section class="py-24 px-4 bg-cream overflow-hidden">
        <!-- Title -->
        <h2 class="font-serif text-3xl md:text-5xl font-bold text-center text-text-main mb-16">
            {{ t('testimonials.title') }}
        </h2>

        <!-- Carousel Container -->
        <div class="relative w-full max-w-6xl mx-auto">
            <!-- Cards Wrapper - visual simulation of the carousel state in screenshot -->
            <div class="flex items-center justify-center gap-6">

                <!-- Left Card (Partially Visible) -->
                <div class="hidden md:block w-1/4 opacity-80 scale-90 blur-[1px]">
                    <div class="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-300">
                        <!-- Placeholder Content -->
                        <div
                            class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <div class="bg-[#CBA175] w-10 h-10 rounded-full flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-5 h-5">
                                    <path fill-rule="evenodd"
                                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="font-bold">{{ t('testimonials.card.songTitle') }}</div>
                            <div class="text-sm opacity-80">PrayerSong</div>
                        </div>
                    </div>
                </div>

                <!-- Center Card (Main Focus) -->
                <div class="w-full md:w-1/3 z-10 scale-100 shadow-2xl rounded-2xl bg-white p-8 border border-gray-100">
                    <!-- Stars -->
                    <div class="flex justify-between items-start mb-6">
                        <div class="flex gap-1 text-[#CBA175]">
                            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <!-- Play Button -->
                        <div class="w-10 h-10 rounded-full bg-[#CBA175] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-5 h-5 text-white">
                                <path fill-rule="evenodd"
                                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <!-- Quote -->
                    <blockquote class="font-serif text-lg leading-relaxed text-text-main mb-8">
                        <span class="font-bold">This is absolutely breathtaking. I can't believe it...</span> I am going
                        to have a hard time keeping this a secret until Sunday. We will listen to it on our way to
                        church! God bless this work you are doing.
                    </blockquote>

                    <!-- Author -->
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                            <!-- Avatar Placeholder -->
                            <div class="w-full h-full bg-gray-400"></div>
                        </div>
                        <div>
                            <div class="font-bold text-text-main">{{ t('testimonials.card.author') }}</div>
                            <div class="flex items-center gap-1 text-[#CBA175] text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-4 h-4">
                                    <path fill-rule="evenodd"
                                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.45 10.335a1 1 0 00.283-.707V13.5a1 1 0 00-1-1H11a1 1 0 00-1 1v.058a1 1 0 00.222.645l.417.485a1 1 0 01.127.35l.08.318a1 1 0 00.97.755h.063a1 1 0 00.975-.826l.046-.226c.036-.178.1-.349.186-.51z"
                                        clip-rule="evenodd" />
                                </svg>
                                {{ t('testimonials.card.verified') }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Card (Partially Visible) -->
                <div class="hidden md:block w-1/4 opacity-80 scale-90 blur-[1px]">
                    <div class="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-300">
                        <!-- Placeholder Content -->
                        <div
                            class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <div class="bg-[#CBA175] w-10 h-10 rounded-full flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-5 h-5">
                                    <path fill-rule="evenodd"
                                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="font-bold">Three Squeezes...</div>
                            <div class="text-sm opacity-80">PrayerSong</div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Dots -->
            <div class="flex justify-center gap-2 mt-12">
                <div class="w-3 h-3 rounded-full bg-gray-800"></div>
                <div class="w-3 h-3 rounded-full bg-gray-300"></div>
                <div class="w-3 h-3 rounded-full bg-gray-300"></div>
                <div class="w-3 h-3 rounded-full bg-gray-300"></div>
                <div class="w-3 h-3 rounded-full bg-gray-300"></div>
                <div class="w-3 h-3 rounded-full bg-gray-300"></div>
                <div class="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
        </div>
    </section>
</template>
