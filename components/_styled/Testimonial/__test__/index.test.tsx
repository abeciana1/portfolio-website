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
})