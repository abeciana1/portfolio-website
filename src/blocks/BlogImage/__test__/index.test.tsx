import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogImage from '../component'

describe('BlogImage', () => {
  beforeEach(() => {
    render(
      <BlogImage
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
        caption="This is a caption"
      />
    )
  })
  test('should render image', () => {
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Sample Image')
  })
  test('should render caption', () => {
    const caption = screen.getByText('This is a caption')
    expect(caption).toBeInTheDocument()
  })
})