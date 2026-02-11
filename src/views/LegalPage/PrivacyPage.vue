<template>
  <div class="min-h-screen bg-[#FFFBF2] text-[#1A1A1A] font-sans">
    <!-- Simple Header -->
    <header class="bg-white border-b border-gray-200 py-4">
      <div class="max-w-4xl mx-auto px-6 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-serif font-bold italic">{{ $t('title', { siteName: SITE_NAME })
          }}</router-link>
        <router-link to="/" class="text-sm font-medium hover:text-[#9C5235]">{{ $t('legal.header.backHome')
        }}</router-link>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-4xl mx-auto px-6 py-12">
      <div class="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
        <h1 class="text-3xl md:text-4xl font-bold font-serif mb-2">{{ $t('legal.privacy.title') }}</h1>
        <p class="text-gray-500 mb-10">{{ $t('legal.privacy.lastUpdated') }}</p>

        <div class="space-y-10">
          <section v-for="(section, key) in $tm('legal.privacy.sections')" :key="key">
            <h2 class="text-xl font-bold mb-4">{{ section.title }}</h2>
            <p v-if="section.content" class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ $t(`legal.privacy.sections.${key}.content`, {
                email: SUPPORT_EMAIL, siteName: SITE_NAME, siteUrl:
              SITE_URL }) }}
            </p>

            <ul v-if="section.items" class="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-2">
              <li v-for="(_, i) in section.items" :key="i">
                {{ $t(`legal.privacy.sections.${key}.items[${i}]`, {
                  email: SUPPORT_EMAIL, siteName: SITE_NAME, siteUrl:
                SITE_URL }) }}
              </li>
            </ul>
          </section>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-100 text-gray-600">
          <p><strong>{{ $t('title', { siteName: SITE_NAME }) }}</strong></p>
          <p>Email: {{ SUPPORT_EMAIL }}</p>
        </div>
      </div>
    </main>

    <!-- Simple Footer -->
    <footer class="bg-[#1A1A1A] text-white py-8 text-center text-sm">
      <p>&copy; 2026 {{ $t('title', { siteName: SITE_NAME }) }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORT_EMAIL, SITE_NAME, SITE_URL } from '@/constants'
useI18n()
</script>
