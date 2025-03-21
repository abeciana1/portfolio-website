import InViewBasic from '@/src/blocks/InViewBasic/component'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('InViewBasic', () => {
  beforeEach(() => {
    render(
      <InViewBasic
        title='InViewBasic'
        description='This is an InViewBasic block'
        hiddenY={0}
        hiddenBlur={4}
        visibleY={1}
        visibleBlur={0}
      />
    )
  })
  test('should render the title text', () => {
    const title = screen.getByText('InViewBasic')
    expect(title).toBeInTheDocument()
  })
  test('should render the description text', () => {
    const description = screen.getByText('This is an InViewBasic block')
    expect(description).toBeInTheDocument()
  })
})