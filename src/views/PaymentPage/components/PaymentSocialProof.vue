<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

// Force cast the array type
interface Song {
  title: string;
  author: string;
  quote: string;
}
const songs = tm('payment.socialProof.songs') as Song[]
</script>

<template>
  <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
    <div class="flex items-center gap-3 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-7 h-7 text-secondary">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
      <h3 class="font-bold text-xl text-black">{{ t('payment.socialProof.title') }}</h3>
    </div>

    <div class="space-y-4">
      <div v-for="(song, index) in songs" :key="index" class="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <button
              class="w-10 h-10 rounded-full bg-secondary hover:bg-secondary-hover text-white flex items-center justify-center transition-colors shadow-md cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 pl-0.5">
                <path fill-rule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clip-rule="evenodd" />
              </svg>
            </button>
            <div>
              <h4 class="font-bold text-black">{{ song.title }}</h4>
              <p class="text-sm text-text-main/60">{{ t('payment.socialProof.orderedBy') }} {{ song.author }}</p>
            </div>
          </div>
          <span class="text-sm text-text-main/60 font-mono">0:00</span>
        </div>
        <p class="text-text-main/80 italic text-sm border-t border-gray-200 pt-3 mt-1">
          {{ song.quote }} — <span class="font-medium not-italic">{{ song.author }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
