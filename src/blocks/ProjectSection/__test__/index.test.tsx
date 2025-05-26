import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectSection from '../component'

describe('ProjectSection', () => {
  beforeEach(() => {
    render(
      <ProjectSection
        sectionId='project-section'
        pill='Projects'
        heading='Project Section'
        description='Project description'
        projects={[]}
        gradient={false}
      />
    )
  })
  test('should render section', () => {
    const section = screen.getByTestId('project-section')
    expect(section).toBeInTheDocument()
  })
  test('should render pill', () => {
    const pill = screen.getByTestId('testimonials-pill')
    expect(pill.textContent).toBe('Projects')
    expect(pill).toBeInTheDocument()
  })
  test('should render heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1
    })
    expect(heading.outerHTML).toBe("<h1 class=\"z-50 text-6xl font-semibold leading-16\">Project Section</h1>")
    expect(heading.textContent).toBe('Project Section')
    expect(heading).toBeInTheDocument()
  })
  test('should render description', () => {
    const description = screen.getByTestId('testimonials-desc')
    expect(description.textContent).toBe('Project description')
    expect(description).toBeInTheDocument()
  })
})