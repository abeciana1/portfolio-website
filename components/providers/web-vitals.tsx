'use client'
import { useReportWebVitals } from 'next/web-vitals'
import { usePostHog } from 'posthog-js/react'

export function WebVitals(): React.ReactElement | null {
  const posthog = usePostHog()
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals', metric)
    } else if (process.env.NODE_ENV === 'production' && posthog) {
      posthog.capture(`Web Vitals — ${metric.name} — ${metric.rating}`, metric)
    }
  })

  return null
}