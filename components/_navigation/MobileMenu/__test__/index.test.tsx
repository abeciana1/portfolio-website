import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MobileMenu from '..'
import userEvent from '@testing-library/user-event'

describe('MobileMenu', () => {
  beforeEach(() => {
    render(
      <MobileMenu
        links={[{ id: 1, link: '/about', label: 'About' }]}
        socialLinks={[{ id: 2, link: 'Behance', label: 'Behance' }]}
      />,
    )
  })
  test('should render hamburger menu button', () => {
    const menuBtn = screen.getByTestId('mobile-btn')
    expect(menuBtn).toBeInTheDocument()
  })
  test('should render navigation links on button click', async () => {
    const menuBtn = screen.getByRole('button')
    await userEvent.click(menuBtn)
    const navLinksList = screen.getByTestId('navLinksList')
    const socialLinksList = screen.getByTestId('socialLinksList')
    expect(navLinksList).toBeInTheDocument()
    expect(socialLinksList).toBeInTheDocument()
    expect(navLinksList.children.length).toBe(1)
    expect(socialLinksList.children.length).toBe(1)
  })
})
