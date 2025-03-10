import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from '@/components/_styled/Heading'

describe('Heading1 test', () => {
  beforeEach(() => {
    render(<Heading1 text="Test Heading 1" />)
  })
  test('should render heading role, level 1', () => {
    const heading1 = screen.getByRole('heading', {
      level: 1
    })
    expect(heading1).toBeInTheDocument()
  })
  test('should render text', () => {
    const heading1Text = screen.getByText('Test Heading 1')
    expect(heading1Text).toBeInTheDocument()
  })
})

describe('Heading2 test', () => {
  beforeEach(() => {
    render(<Heading2 text="Test Heading 2" />)
  })
  test('should render heading role, level 2', () => {
    const heading2 = screen.getByRole('heading', {
      level: 2
    })
    expect(heading2).toBeInTheDocument()
  })
  test('should render text', () => {
    const heading2Text = screen.getByText('Test Heading 2')
    expect(heading2Text).toBeInTheDocument()
  })
})

describe('Heading3 test', () => {
  beforeEach(() => {
    render(<Heading3 text="Test Heading 3" />)
  })
  test('should render heading role, level 3', () => {
    const heading3 = screen.getByRole('heading', {
      level: 3
    })
    expect(heading3).toBeInTheDocument()
  })
  test('should render text', () => {
    const heading3Text = screen.getByText('Test Heading 3')
    expect(heading3Text).toBeInTheDocument()
  })
})

describe('Heading4 test', () => {
  beforeEach(() => {
    render(<Heading4 text="Test Heading 4" />)
  })
  test('should render heading role, level 4', () => {
    const heading4 = screen.getByRole('heading', {
      level: 4
    })
    expect(heading4).toBeInTheDocument()
  })
  test('should render text', () => {
    const heading4Text = screen.getByText('Test Heading 4')
    expect(heading4Text).toBeInTheDocument()
  })
})

describe('Heading5 test', () => {
  beforeEach(() => {
    render(<Heading5 text="Test Heading 5" />)
  })
  test('should render heading role, level 5', () => {
    const heading5 = screen.getByRole('heading', {
      level: 5
    })
    expect(heading5).toBeInTheDocument()
  })
  test('should render text', () => {
    const heading5Text = screen.getByText('Test Heading 5')
    expect(heading5Text).toBeInTheDocument()
  })
})

describe('Heading6 test', () => {
  beforeEach(() => {
    render(<Heading6 text="Test Heading 6" />)
  })
  test('should render heading role, level 6', () => {
    const heading6 = screen.getByRole('heading', {
      level: 6
    })
    expect(heading6).toBeInTheDocument()
  })
  test('should render text', () => {
    const heading6Text = screen.getByText('Test Heading 6')
    expect(heading6Text).toBeInTheDocument()
  })
})