import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import OverviewSection from '../component'

describe('OverviewSection', () => {
  beforeEach(() => {
    render(
      <OverviewSection
        title='Overview'
        content_html="<div>hello testing</div>"
        role={['designer']}
        duration={{
          timeLength: 3,
          frequency: 'months'
        }}
        tags={[
          {
            id: 2,
            label: 'test label',
          }
        ]}
        greyBackground={false}
      />
    )
  })
  test('should render heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1
    })
    expect(heading.textContent).toBe('Overview')
    expect(heading).toBeInTheDocument()
  })
  test('should render roles', () => {
    const roles = screen.getByTestId('roles')
    expect(roles.children).toHaveLength(1)
    expect(roles).toBeInTheDocument()
    expect(roles.children[0].textContent).toBe('Designer')
  })
  test('should render duration', () => {
    const duration = screen.getByTestId('duration')
    expect(duration.textContent).toBe('3 months')
    expect(duration).toBeInTheDocument()
  })
  test('should render tags', () => {
    const tags = screen.getByTestId('tags')
    expect(tags.children).toHaveLength(1)
    expect(tags.children[0].textContent).toBe('test label')
    expect(tags).toBeInTheDocument()
  })
})