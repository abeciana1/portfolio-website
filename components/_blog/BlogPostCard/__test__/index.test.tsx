import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogPostCard from '../index'

describe('BlogPostCard', () => {
  beforeEach(() => {
    render(
      <BlogPostCard
        title="Test"
        slug="test"
        publishedDate="2025-08-28T12:00:00.000Z"
        tags={[
          {
            id: 1,
            label: 'Artificial Intelligence',
          },
          {
            id: 2,
            label: 'LLM',
          },
        ]}
        category={{
          id: 1,
          label: 'Artificial Intelligence',
        }}
        meta={{
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
          description: 'Test description',
        }}
        teaserContent="<div>Test teaser content</div>"
      />,
    )
  })
  test('should render blog post title', () => {
    const title = screen.getByTestId('blog-title')
    expect(title.textContent).toBe('Test')
  })
  test('should render blog post excerpt', () => {
    const excerpt = screen.getByTestId('blog-excerpt')
    expect(excerpt.textContent).toBe('Test description...')
  })
  test('should render blog post category', () => {
    const category = screen.getByTestId('blog-category')
    expect(category.children.length).toBe(1)
    expect(category.children[0].textContent).toBe('Artificial Intelligence')
    expect(category).toBeInTheDocument()
  })
  test('should render blog author', () => {
    const author = screen.getByTestId('blog-author')
    expect(author.children.length).toBe(1)
    expect(author.children[0].textContent).toBe('By Alex Beciana')
    expect(author).toBeInTheDocument()
  })
  test('should render blog post tags', () => {
    const tags = screen.getByTestId('tags-list')
    expect(tags.children.length).toBe(2)
    expect(tags.children[0].textContent).toBe('Artificial Intelligence')
    expect(tags.children[1].textContent).toBe('LLM')
    expect(tags).toBeInTheDocument()
  })
  test('should render blog post image', () => {
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Hero Image')
  })
  test('should render blog post date', () => {
    const date = screen.getByTestId('blog-date')
    expect(date.textContent).toBe('Aug 28 2025')
  })
  test('should render blog post teaser content', async () => {
    const post = screen.getByTestId('blog-post')
    await userEvent.click(post)
    const teaserContent = screen.getByText('Test teaser content')
    expect(teaserContent).toBeInTheDocument()
  })
  test('should render blog post link', async () => {
    const post = screen.getByTestId('blog-post')
    await userEvent.click(post)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test')
  })
})
