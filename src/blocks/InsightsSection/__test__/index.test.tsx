import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InsightsSection from '../component'

describe('InsightsSection', () => {
  beforeEach(() => {
    render (
      <InsightsSection
        sectionId="insight-section"
        heading="Insights"
        description="Insights description"
        insights={[]}
      />
    )
  })
  test('should render section', () => {
    const section = screen.getByTestId('insight-section')
    expect(section).toBeInTheDocument()
  })
  test('should render heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1,
    })
    expect(heading.textContent).toBe('Insights')
    expect(heading).toBeInTheDocument()
  })
  test('should render description', () => {
    const description = screen.getByTestId('insight-desc')
    expect(description.textContent).toBe('Insights description')
    expect(description).toBeInTheDocument()
  })
})
