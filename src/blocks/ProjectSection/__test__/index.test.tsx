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
})