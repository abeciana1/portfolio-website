import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Job from '@/src/blocks/Job/component'

describe('Job', () => {
  beforeEach(() => {
    render(
      <Job
        companyName='Company'
        jobRole='Developer'
        positionType='Contract'
        companyDescription='Description'
        companyWebsite='https://example.com'
        startDate='2025-08-12'
        currentPosition
        location='Remote'
        companyLogo={[
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
            gradient: false,
            gradientXFlip: false,
            gradientYFlip: false,
            gradientSelect: 'Variant1',
          },
        ]}
        duties={[
          {content_html: '<h1>hello</h1>'}
        ]}
        skills={[
          {
            id: 1,
            title: 'Git',
            skillIcon: {
              id: 1,
              alt: 'Test Alt',
              updatedAt: '',
              createdAt: '',
            },
            createdAt: '',
            updatedAt: ''
          }
        ]}
      />
    )
  })
})