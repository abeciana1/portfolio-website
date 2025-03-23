import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CodeMockupSection from '../component'
import CodeMockupLine from '../../CodeMockupLine/component'

describe('CodeMockupSection', () => {
  beforeEach(() => {
    render(
      <CodeMockupSection
        sectionId="code-mockup-section"
        enableSection={true}
        background="black"
      >
        <CodeMockupLine text="import CodeMockupSection from './CodeMockupSection/component'" prefix="$" textColor="white" />
      </CodeMockupSection>
    )
  })
  test('should render the section with the provided id', () => {
    const section = screen.getByTestId('code-mockup-section')
    expect(section).toBeInTheDocument()
  })
})