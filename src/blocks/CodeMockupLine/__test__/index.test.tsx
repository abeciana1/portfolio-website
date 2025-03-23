import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CodeMockupLine from '../component'

describe('CodeMockupLine', () => {
  beforeEach(() => {
    render(
      <CodeMockupLine text="import CodeMockupLine from './component'" prefix="$" textColor="white" />
    )
  })
  test('should render the code mockup line with the provided text and prefix', () => {
    const codeMockupLine = screen.getByText("import CodeMockupLine from './component'")
    expect(codeMockupLine).toBeInTheDocument()
  })
})