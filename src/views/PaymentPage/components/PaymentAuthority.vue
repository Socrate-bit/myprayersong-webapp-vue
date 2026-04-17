<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
    <!-- Image -->
    <div class="h-52 md:h-64 w-full overflow-hidden">
      <img
        src="/checkout_authority.jpg"
        alt="Time CançãoOração"
        class="w-full h-full object-cover object-[center_20%]"
      />
    </div>

    <!-- Content -->
    <div class="p-5 md:p-7 space-y-4">
      <h2 class="font-serif text-xl md:text-2xl font-bold text-text-main">
        {{ t('payment.authority.title') }}
      </h2>
      <p class="text-text-main/70 text-sm md:text-base leading-relaxed">
        {{ t('payment.authority.desc') }}
      </p>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2 pt-1">
        <span v-for="key in ['badge1', 'badge2', 'badge3']" :key="key"
          class="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary text-xs font-bold px-3 py-1.5 rounded-full">
          <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
          {{ t(`payment.authority.${key}`) }}
        </span>
      </div>
    </div>
  </div>
</template>
