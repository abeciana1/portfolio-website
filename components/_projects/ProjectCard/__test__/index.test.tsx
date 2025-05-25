import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectCard from '..'

describe('ProjectCard', () => {
  beforeEach(() => {
    render(
      <ProjectCard
        title='Project title'
        excerpt='Project excerpt'
        slug='/project-title'
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
  test('should be linked to project page', () => {
    const card = screen.getByRole('link')
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute('href', 'projects/project-title')
  })
  test('should render project title', () => {
    const title = screen.getByTestId('project-title')
    expect(title.textContent).toBe('Project title')
    expect(title).toBeInTheDocument()
  })
  test('should render image', () => {
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Hero Image')
    expect(image).toHaveAttribute('height', '100')
    expect(image).toHaveAttribute('width', '100')
    expect(image).toBeInTheDocument()
  })
  test('should render excerpt', () => {
    const excerpt = screen.getByTestId('project-excerpt')
    expect(excerpt.textContent).toBe('Project excerpt')
    expect(excerpt).toBeInTheDocument()
  })
  test('should render tags list', () => {
    const tagList = screen.getByTestId('tags-list')
    expect(tagList.children.length).toBe(1)
    expect(tagList).toBeInTheDocument()
  })
})