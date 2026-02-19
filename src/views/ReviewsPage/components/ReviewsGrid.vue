<script setup lang="ts">
import { computed } from 'vue'
import ReviewCard from './ReviewCard.vue'
import { reviews, type Review } from '../testimony'

const shuffle = <T>(array: T[]) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const sortedReviews = computed(() => {
  const videos = reviews.filter(r => r.type === 'video')
  const images = reviews.filter(r => r.type === 'image')
  const texts = reviews.filter(r => r.type !== 'video' && r.type !== 'image')

  return [
    ...shuffle(videos),
    ...shuffle(images),
    ...shuffle(texts)
  ]
})

const distributeReviews = (items: Review[], cols: number) => {
  const columns: Review[][] = Array.from({ length: cols }, () => [])
  items.forEach((item, index) => {
    const colIndex = index % cols
    if (columns[colIndex]) {
      columns[colIndex].push(item)
    }
  })
  return columns
}

const reviewsIn2Cols = computed(() => distributeReviews(sortedReviews.value, 2))
const reviewsIn3Cols = computed(() => distributeReviews(sortedReviews.value, 3))
</script>

<template>
  <section class="max-w-[1400px] mx-auto px-4">
    <!-- Mobile (1 Column) -->
    <div class="flex flex-col space-y-4 md:hidden">
      <ReviewCard v-for="review in sortedReviews" :key="review.id" :review="review" />
    </div>

    <!-- Tablet (2 Columns) -->
    <div class="hidden md:flex lg:hidden gap-6 items-start">
      <div v-for="(col, index) in reviewsIn2Cols" :key="index" class="flex-1 flex flex-col gap-6">
        <ReviewCard v-for="review in col" :key="review.id" :review="review" />
      </div>
    </div>

    <!-- Desktop (3 Columns) -->
    <div class="hidden lg:flex gap-6 items-start">
      <div v-for="(col, index) in reviewsIn3Cols" :key="index" class="flex-1 flex flex-col gap-6">
        <ReviewCard v-for="review in col" :key="review.id" :review="review" />
      </div>
    </div>
  </section>
</template>
