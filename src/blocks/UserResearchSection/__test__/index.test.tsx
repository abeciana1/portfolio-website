import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserResearchSection from '../component'

describe('UserResearchSection', () => {
  beforeEach(() => {
    render(
      <UserResearchSection
        sectionId="research-section"
        pill="Research"
        heading="Research Section"
        description="Research description"
        research={[]}
      />,
    )
  })
  test('should render section', () => {
    const section = screen.getByTestId('research-section')
    expect(section).toBeInTheDocument()
  })
  test('should render pill', () => {
    const pill = screen.getByTestId('research-pill')
    expect(pill.textContent).toBe('Research')
    expect(pill).toBeInTheDocument()
  })
  test('should render heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1,
    })
    expect(heading.textContent).toBe('Research Section')
    expect(heading).toBeInTheDocument()
  })
  test('should render description', () => {
    const description = screen.getByTestId('research-desc')
    expect(description.textContent).toBe('Research description')
    expect(description).toBeInTheDocument()
  })
})
