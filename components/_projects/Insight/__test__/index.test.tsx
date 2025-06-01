import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Insight from '@/components/_projects/Insight'

describe('Insight', () => {
  beforeEach(() => {
    render (
      <Insight
        title='Title'
        body='Body description'
      />
    )
  })
  test('should render title', () => {
    const title = screen.getByTestId('insight-title')
    expect(title.textContent).toBe('Title')
    expect(title).toBeInTheDocument()
  })
  test('should render body', () => {
    const body = screen.getByTestId('insight-body')
    expect(body.textContent).toBe('Body description')
    expect(body).toBeInTheDocument()
  })
  test('should render listitem', () => {
    const item = screen.getByRole('listitem')
    expect(item).toBeInTheDocument()
  })
})
