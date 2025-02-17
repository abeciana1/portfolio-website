import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavLogo from '../'

describe('NavLogo', () => {
  beforeEach(() => {
    render(<NavLogo src="/test.png" alt="Logo" width={100} height={100} />)
  })
  test('should render link', () => {
    const linkEl = screen.getByRole('link')
    expect(linkEl).toBeInTheDocument()
    expect(linkEl).toHaveAttribute('href', '/')
  })
})
