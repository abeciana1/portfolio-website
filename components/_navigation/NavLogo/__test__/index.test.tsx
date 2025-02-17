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
  test('should render image', () => {
    const imgEl = screen.getByRole('img')
    expect(imgEl).toBeInTheDocument()
    expect(imgEl).toHaveAttribute('alt', 'Logo')
    expect(imgEl).toHaveAttribute('width', '100')
    expect(imgEl).toHaveAttribute('height', '100')
  })
})
