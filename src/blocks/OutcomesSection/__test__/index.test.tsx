import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import OutcomesSection from '../component'

describe('OutcomesSection', () => {
  beforeEach(() => {
    render(
      <OutcomesSection
        sectionId='outcome-section'
        pill='Outcomes'
        heading='Outcomes'
        description='Outcomes description'
        outcomes={[]}
      />
    )
  })
  test('should render section', () => {
    const section = screen.getByTestId('outcome-section')
    expect(section).toBeInTheDocument()
  })
  test('should render pill', () => {
    const pill = screen.getByTestId('outcome-pill')
    expect(pill.textContent).toBe('Outcomes')
    expect(pill).toBeInTheDocument()
  })
  test('should render heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1
    })
    expect(heading.textContent).toBe('Outcomes')
    expect(heading).toBeInTheDocument()
  })
  test('should render description', () => {
    const description = screen.getByTestId('outcome-desc')
    expect(description.textContent).toBe('Outcomes description')
    expect(description).toBeInTheDocument()
  })
})