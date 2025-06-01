import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserResearchCard from '../'

class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }
  observe(el: Element) {
    // Immediately fire the callback as if “in view”
    this.callback(
      [
        {
          isIntersecting: true,
          target: el,
          intersectionRatio: 1,
          time: Date.now(),
          boundingClientRect: el.getBoundingClientRect(),
          intersectionRect: el.getBoundingClientRect(),
          rootBounds: null,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver
    )
  }
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  configurable: true,
  writable: true,
  value: MockIntersectionObserver,
})

describe('UserResearchCard', () => {
  beforeEach(() => {
    render(<UserResearchCard researchType="survey" numberMetric={10} />)
  })
  test('should render emoji', () => {
    const emoji = screen.getByTestId('research-header')
    expect(emoji.textContent).toBe('📝')
    expect(emoji).toBeInTheDocument()
  })
  test('should render metric number and label', async () => {
    const metrics = await screen.findByTestId('metrics', {}, { timeout: 5000 })
    expect(metrics.textContent).toBe('0survey responses')
    await waitFor(() => {
      expect(metrics.textContent).toBe('10survey responses')
    })
    expect(metrics).toBeInTheDocument()
  })
})
