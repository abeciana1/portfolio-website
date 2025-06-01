import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProblemFramingSection from '../component'

describe('ProblemFramingSection', () => {
  beforeEach(() => {
    render(
      <ProblemFramingSection
        sectionId='problem-section'
        pill='Problems'
        heading='Problem Section'
        description='Problem description'
        problems={[{
          frame: 'who',
          description: 'who'
        }]}
      />
    )
  })
  test('should render section', () => {
    const section = screen.getByTestId('problem-section')
    expect(section).toBeInTheDocument()
  })
  test('should render pill', () => {
    const pill = screen.getByTestId('problem-pill')
    expect(pill.textContent).toBe('Problems')
    expect(pill).toBeInTheDocument()
  })
  test('should render heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1
    })
    expect(heading.textContent).toBe('Problem Section')
    expect(heading).toBeInTheDocument()
  })
  test('should render description', () => {
    const description = screen.getByTestId('problem-desc')
    expect(description.textContent).toBe('Problem description')
    expect(description).toBeInTheDocument()
  })
})