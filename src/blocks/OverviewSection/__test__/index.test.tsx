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
})