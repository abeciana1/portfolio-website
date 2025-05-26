import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeroSectionNoImage from '../component'

describe('HeroSectionNoImage', () => {
  beforeEach(() => {
    render(
      <HeroSectionNoImage
        sectionId='test-section'
        title='Test Section'
        subtitle='Subsection text'
        description='Hero description'
        secondaryBlurb='Hero secondary blur'
      />
    )
  })
})