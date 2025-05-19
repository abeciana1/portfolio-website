import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TestimonialSection from '../component'

describe('TestimonialSection', () => {
  beforeEach(() => {
    render(
      <TestimonialSection
        sectionId='testimonials'
        pill='Testionials'
        heading='Testimonials'
        description='Testimonials description'
        gradient={false}
        carouselCustom={false}
        enableInfinite={false}
        carouselTimer={false}
        secondsTimer={0}
        testimonials={[
          {
            name: 'name',
            position: 'position',
            company: 'company',
            headshot: {
              id: 1,
              width: 100,
              height: 100,
              alt: 'testimonial headshot',
              webpUrl: 'https://example.com',
              updatedAt: '',
              createdAt: ''
            },
            callout: 'callout',
            content_html: ''
          }
        ]}
      />
    )
  })
})