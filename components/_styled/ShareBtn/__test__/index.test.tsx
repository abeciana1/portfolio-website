/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ShareBtn from '../'
import { Copy } from 'lucide-react';

jest.mock('@/src/blocks/CallToAction/component', () => ({
  variants: { primary: 'primary' },
}));

jest.mock('@uidotdev/usehooks', () => {
  const React = require('react');
  return {
    useHover: () => {
      const [hover, setHover] = React.useState(false);
      const ref = React.useCallback((node: any) => {
        if (!node) return;
        const onEnter = () => setHover(true);
        const onLeave = () => setHover(false);
        node.addEventListener('mouseenter', onEnter);
        node.addEventListener('mouseleave', onLeave);
      }, []);
      return [ref, hover];
    },
  };
});

const mockOnClick = jest.fn()

describe('ShareBtn', () => {
  beforeEach(() => {
    render(
      <ShareBtn
        text='Copy link'
        icon={Copy}
        onClick={mockOnClick}
      />
    )
  })
  test('should render button', () => {
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
  test('should call onClick', async () => {
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
  test('should render aria-label', () => {
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Copy link')
  })
  test('should render tooltip on hover', async () => {
    const button = screen.getByRole('button')
    await userEvent.hover(button)
    const tooltip = screen.getByTestId('tooltip')
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveTextContent('Copy link')
  })
})