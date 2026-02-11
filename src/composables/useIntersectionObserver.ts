import { onMounted, onUnmounted, ref, type Ref, watch } from 'vue'

export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.1 }
) {
  const isIntersecting = ref(false)
  let observer: IntersectionObserver | null = null

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  const startObserving = (el: HTMLElement) => {
    cleanup()
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) isIntersecting.value = entry.isIntersecting
    }, options)
    observer.observe(el)
  }

  onMounted(() => {
    if (target.value) startObserving(target.value)
  })

  watch(target, (el) => {
    if (el) startObserving(el)
    else cleanup()
  })

  onUnmounted(cleanup)

  return { isIntersecting }
}
