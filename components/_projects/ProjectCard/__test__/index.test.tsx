import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectCard from '..'

describe('ProjectCard', () => {
  beforeEach(() => {
    render(
      <ProjectCard
        title='Project title'
        excerpt='Project excerpt'
        slug='/projects/project-title'
        image={{
          id: 1,
          alt: 'Hero Image',
          convertWebp: true,
          url: 'http://www.example.com/image.jpg',
          webpUrl: 'http://www.example.com/image.jpg',
          updatedAt: '2025-01-23',
          createdAt: '2025-01-23',
          height: 100,
          width: 100,
        }}
        tags={[
          {
            id: 1,
            label: 'test'
          }
        ]}
      />
    )
  })
})