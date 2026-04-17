import { ref, computed } from 'vue'

const INITIAL_SECONDS = 10 * 60
const secondsLeft = ref(INITIAL_SECONDS)
const hasStarted = ref(false)
let interval: ReturnType<typeof setInterval> | null = null

export function useUrgencyTimer() {
  const start = () => {
    if (interval || hasStarted.value) return
    hasStarted.value = true
    interval = setInterval(() => {
      if (secondsLeft.value > 0) secondsLeft.value--
      else if (interval) { clearInterval(interval); interval = null }
    }, 1000)
  }

  const isExpired = computed(() => secondsLeft.value <= 0)

  const formatted = computed(() => {
    const s = Math.max(0, secondsLeft.value)
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  })

  return { hasStarted, isExpired, formatted, start }
}
