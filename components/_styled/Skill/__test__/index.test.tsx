import Skill from '../'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Skill', () => {
  beforeEach(() => {
    render(
      <Skill
        title='Git'
        skillIcon={{
          id: 1,
          alt: 'Test Alt',
          updatedAt: '',
          createdAt: '',
          webpUrl: '/test.png'
        }}
      />
    )
  })
  test('should render skill name', () => {
    const skillName = screen.getByText('Git')
    expect(skillName).toBeInTheDocument()
  })
  test('should render skill icon', () => {
    const skillImage = screen.getByRole('img')
    expect(skillImage).toBeInTheDocument()
    expect(skillImage).toHaveAttribute('alt', 'Alex Beciana | Skill - Test Alt')
  })
})