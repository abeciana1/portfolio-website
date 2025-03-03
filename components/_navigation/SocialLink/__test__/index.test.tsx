import SocialLink from '../'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {describe, expect, test} from '@jest/globals';

describe('SocialLink', () => {
  beforeEach(() => {
    render(
      <SocialLink
        link='https://www.behance.net/alexbeciana'
        label='Behance'
      />
    )
  })
  test('should render', () => {
    const link = screen.getByRole('link', {
      name: 'Behance'
    })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://www.behance.net/alexbeciana')
  })
})