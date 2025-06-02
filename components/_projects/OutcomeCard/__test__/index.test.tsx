import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import OutcomeCard, { OutcomeStat } from '../'

describe('OutcomeStat', () => {
  beforeEach(() => {
    render (
      <OutcomeStat
        number={10}
        label='label'
        numLabel='%'
      />
    )
  })
  test('should render number stat', () => {
    const numberStat = screen.getByTestId('number-stat')
    expect(numberStat.textContent).toBe('10%')
    expect(numberStat).toBeInTheDocument()
  })
  test('should render label', () => {
    const label = screen.getByTestId('stat-label')
    expect(label.textContent).toBe('label')
    expect(label).toBeInTheDocument()
  })
})

describe('OutcomeCard', () => {
  beforeEach(() => {
    render(
      <OutcomeCard
        resultType='adoption'
        emojis='📞'
        stats={[]}
      />
    )
  })
  test('should render result type', () => {
    const result = screen.getByTestId('result-type')
    expect(result.textContent).toBe('Adoption')
    expect(result).toBeInTheDocument()
  })
  test('should render emojis', () => {
    const emojis = screen.getByTestId('emojis')
    expect(emojis.textContent).toBe('📞')
    expect(emojis).toBeInTheDocument()
  })
})