'use client'

import { useReportWebVitals } from 'next/web-vitals'
import React from 'react'

export function WebVitals(): React.ReactElement | null {
  useReportWebVitals((metric) => {
    console.log('Web Vitals', metric)
  })

  return null
}