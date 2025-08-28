import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogHeader from '../component'

describe('BlogHeader', () => {
  beforeEach(() => {
    render(
      <BlogHeader
        title='Test title'
        excerpt='Test excerpt'
        featuredImage={{
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
        category={{
          id: 1,
          label: 'test category',
          addBorder: false
        }}
        tags={[
          {
            id: 1,
            label: 'test tag',
            addBorder: false
          }
        ]}
      />
    )
  })
  test('should render title', () => {
    const title = screen.getByRole('heading', {
      level: 1
    })
    expect(title.textContent).toBe('Test title')
    expect(title).toBeInTheDocument()
  })
  test('should render excerpt', () => {
    const excerpt = screen.getByTestId('blog-excerpt')
    expect(excerpt.textContent).toBe('Test excerpt')
    expect(excerpt).toBeInTheDocument()
  })
  test('should render tags list', () => {
    const tagList = screen.getByTestId('tags-list')
    expect(tagList.children.length).toBe(1)
    expect(tagList.children[0].textContent).toBe('test tag')
    expect(tagList).toBeInTheDocument()
  })
  test('should render category', () => {
    const category = screen.getByTestId('blog-category')
    expect(category.textContent).toBe('test category')
    expect(category).toBeInTheDocument()
  })
})