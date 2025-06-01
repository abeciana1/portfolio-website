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
})