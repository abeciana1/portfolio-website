import NavLink from '../'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('NavLink', () => {
  beforeEach(() => {
    render(
      <NavLink
        link='/test'
        label='test'
      />
    )
  })
  test('should render list item', () => {
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
  })
  test('should render link', () => {
    const linkEl = screen.getByRole('link', {
      name: 'test'
    })
    expect(linkEl).toBeInTheDocument()
    expect(linkEl).toHaveAttribute('href', '/test')
  })
})