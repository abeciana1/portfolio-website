import RichTextEditor from '../component'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('RichTextEditor', () => {
  beforeEach(() => {
    render(
      <RichTextEditor
        content_html="<h1>Hello</h1>"
      />
    )
  })
  test('should render text', () => {
    const content = screen.getByText('Hello')
    expect(content).toBeInTheDocument()
  })
  test('should render heading', () => {
    const content = screen.getByRole('heading', {
      level: 1
    })
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent('Hello')
  })
})