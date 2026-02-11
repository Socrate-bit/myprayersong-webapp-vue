import posthog from 'posthog-js'

export function usePostHog() {
  posthog.init('phc_Ouw57K1df3wMK68j81e7KvUiMbYYfyBiIZzPOjMZQi8', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2025-11-30'
  })

  return { posthog }
}
