import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectTag from '..'

describe('ProjectTag', () => {
  beforeEach(() => {
    render(
      <ProjectTag
        label='Test'
        addBorder={false}
      />
    )
  })
  test('should render tag', () => {
    const tag = screen.getByRole('listitem')
    expect(tag.textContent).toBe('Test')
    expect(tag).toBeInTheDocument()
  })
})