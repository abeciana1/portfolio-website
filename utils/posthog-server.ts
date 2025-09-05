'use client'
import { PostHog } from 'posthog-node'

export const PostHogServer = () => {
    return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    })
}