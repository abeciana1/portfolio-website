import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ScrollToTop from '..'

describe('ScrollToTop', () => {
  beforeEach(() => {
    render(<ScrollToTop />)
  })
  test('should render scroll to top button', () => {
    const scrollToTop = screen.getByTestId('scroll-to-top')
    expect(scrollToTop).toBeInTheDocument()
  })
  test('should scroll to top when button is clicked', async () => {
    const scrollToTop = screen.getByTestId('scroll-to-top')
    await userEvent.click(scrollToTop)
    expect(window.scrollY).toBe(0)
  })
})
