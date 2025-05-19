import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Testimonial from '../'

describe('Testimonial', () => {
  beforeEach(() => {
    render(
      <Testimonial
        name='name'
        position='position'
        company='company'
        callout='callout'
        content_html='<h1>hello</h1>'
        headshot={{
          id: 1,
          width: 100,
          height: 100,
          alt: 'testimonial headshot',
          webpUrl: 'https://example.com',
          updatedAt: '',
          createdAt: ''
        }}
      />
    )
  })
  test('should render headshot', () => {
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'name headshot')
    expect(image).toBeInTheDocument()
  })
  test('should render quote callout', () => {
    const callout = screen.getByTestId('callout')
    expect(callout.textContent).toBe('"callout"')
    expect(callout).toBeInTheDocument()
  })
  test('should render position and company', () => {
    const position = screen.getByTestId('position')
    expect(position.textContent).toBe('position @ company')
    expect(position).toBeInTheDocument()
  })
})