import '@testing-library/jest-dom'


class IntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}

  observe() {}

  unobserve() {}

  disconnect() {}
}

// Assign the mock to the global object
(global as any).IntersectionObserver = IntersectionObserver;