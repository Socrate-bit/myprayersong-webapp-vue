import posthog from 'posthog-js'

// Initialize PostHog once at module level
posthog.init('phc_Ouw57K1df3wMK68j81e7KvUiMbYYfyBiIZzPOjMZQi8', {
  api_host: 'https://us.i.posthog.com',
  capture_pageview: true // We'll handle pageviews manually in the router
})

export function usePostHog() {
  return { posthog }
}
