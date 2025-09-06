import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DarkModeToggle from '..'

describe('DarkModeToggle', () => {
  beforeEach(() => {
    render(<DarkModeToggle />)
  })
  test('should render toggle button', () => {
    const togglebtn = screen.getByTestId('dark-mode-toggle')
    expect(togglebtn).toBeInTheDocument()
  })
})
