'use client'

import { useReportWebVitals } from 'next/web-vitals'
import React from 'react'

export function WebVitals(): React.ReactElement | null {
  useReportWebVitals((metric) => {
    console.log(metric)
  })

  return null
}