import Pill from '../'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Pill', () => {
  beforeEach(() => {
    render(
      <Pill
        text='Test'
      />
    )
  })
  test('should render text from pill', () => {
    const pill = screen.getByText('Test')
    expect(pill).toBeInTheDocument()
  })
})