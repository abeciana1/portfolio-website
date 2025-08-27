import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ImageComponent from '@/src/blocks/Image/component'

describe('ImageComponent', () => {
  beforeEach(() => {
    render(
      <ImageComponent
        image={{
          id: 1,
          alt: 'Sample Image',
          convertWebp: true,
          url: 'http://www.example.com/image.jpg',
          webpUrl: 'http://www.example.com/image.jpg',
          updatedAt: '2025-01-23',
          createdAt: '2025-01-23',
          height: 100,
          width: 100,
        }}
        forcedWidth={100}
        forcedHeight={100}
        gradient={false}
        gradientXFlip={false}
        gradientYFlip={false}
        gradientSelect="Variant1"
      />,
    )
  })
  test('should render an image', () => {
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', 'Sample Image')
    expect(img).toHaveAttribute('height', '100')
    expect(img).toHaveAttribute('width', '100')
  })
})