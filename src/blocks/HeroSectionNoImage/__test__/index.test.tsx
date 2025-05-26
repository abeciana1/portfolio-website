import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeroSectionNoImage from '../component'
import { sub } from 'date-fns'

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
  test('should render hero section', () => {
    const heroSection = screen.getByTestId('test-section')
    expect(heroSection).toBeInTheDocument()
  })
  test('should render title', () => {
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title.textContent).toBe('Test Section')
    expect(title).toBeInTheDocument()
  })
  test('shoulder render subtitle', () => {
    const subtitle = screen.getByRole('heading', {
      level: 2
    })
    expect(subtitle.textContent).toBe('Subsection text')
    expect(subtitle).toBeInTheDocument()
  })
  test('should render description', () => {
    const description = screen.getByTestId('description')
    expect(description.textContent).toBe('Hero description')
    expect(description).toBeInTheDocument()
  })
  test('should render secondary blurb', () => {
    const blurb = screen.getByTestId('secondary-blurb')
    expect(blurb.textContent).toBe('Hero secondary blur')
    expect(blurb).toBeInTheDocument()
  })
})