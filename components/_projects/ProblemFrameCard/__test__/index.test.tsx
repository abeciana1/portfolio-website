import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProblemFrameCard from '../'

describe('ProblemFrameCard', () => {
  beforeEach(() => {
    render(
      <ProblemFrameCard
        frame='who'
        description='who description'
      />
    )
  })
  test('should render frame heading', () => {
    const heading = screen.getByTestId('frame-heading')
    expect(heading.textContent).toBe('Who🤔')
    expect(heading).toBeInTheDocument()
  })
  test('should render description', () => {
    const description = screen.getByTestId('frame-desc')
    expect(description.textContent).toBe('who description')
    expect(description).toBeInTheDocument()
  })
})