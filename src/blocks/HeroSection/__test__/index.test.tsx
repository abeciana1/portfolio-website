import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeroSection from '@/src/blocks/HeroSection/component'

describe('HeroSection', () => {
  beforeEach(() => {
    render(
      <HeroSection
        blockType="hero-section"
        sectionId="hero-section"
        title="Welcome to My Website"
        subtitle="This is a sample website"
        description="This is a description of my website"
        media={[
          {
            image: {
              id: 1,
              alt: 'Hero Image',
              convertWebp: true,
              url: 'http://www.example.com/image.jpg',
              webpUrl: 'http://www.example.com/image.jpg',
              updatedAt: '2025-01-23',
              createdAt: '2025-01-23',
              height: 100,
              width: 100,
            },
            blockType: 'image-block',
            gradient: false,
            gradientXFlip: false,
            gradientYFlip: false,
            gradientSelect: 'Variant1',
          },
        ]}
      />,
    )
  })
  test('should render a section id', () => {
    const section = screen.getByLabelText('section')
    expect(section).toHaveAttribute('id', 'hero-section')
  })
  test('should render a title', () => {
    const title = screen.getByText('Welcome to My Website')
    expect(title).toBeInTheDocument()
  })
  test('should render an image', () => {
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', 'Hero Image')
    expect(img).toHaveAttribute('height', '100')
    expect(img).toHaveAttribute('width', '100')
  })
})
