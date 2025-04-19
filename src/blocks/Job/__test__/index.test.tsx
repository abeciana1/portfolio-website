import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Job from '@/src/blocks/Job/component'
import userEvent from '@testing-library/user-event';


describe('Job', () => {
  beforeEach(() => {
    render(
      <Job
        companyName='Company'
        jobRole='Developer'
        positionType='Contract'
        companyDescription='Description'
        companyWebsite='https://example.com'
        startDate='2025-08-12'
        currentPosition
        location='Remote'
        companyLogo={[
          {
            image: {
              id: 1,
              alt: 'Hero Image',
              convertWebp: true,
              url: 'http://www.example.com/image.jpg',
              webpUrl: 'http://www.example.com/image.jpg',
              updatedAt: '2025-01-23',
              createdAt: '2025-01-23',
              height: 100,
              width: 100,
            },
            gradient: false,
            gradientXFlip: false,
            gradientYFlip: false,
            gradientSelect: 'Variant1',
          },
        ]}
        duties={[
          {content_html: '<h1>hello</h1>'}
        ]}
        skills={[
          {
            id: 1,
            title: 'Git',
            skillIcon: {
              id: 1,
              alt: 'Test Alt',
              updatedAt: '',
              createdAt: '',
            },
            createdAt: '',
            updatedAt: ''
          }
        ]}
      />
    )
  })
  test('should render company name', () => {
    const companyName = screen.getByTestId('company-name')
    expect(companyName).toBeInTheDocument()
    expect(companyName.innerText).toBe('Company')
  })
  test('should render job role', () => {
    const role = screen.getByTestId('job-role')
    expect(role.innerText).toBe('Developer')
    expect(role).toBeInTheDocument()
  })
  test('should render position', () => {
    const position = screen.getByTestId('position')
    expect(position.innerText).toBe('Contract')
    expect(position).toBeInTheDocument()
  })
  test('should render company description', async () => {
    const jobEl = screen.getByTestId('job')
    await userEvent.click(jobEl)
    const description = await screen.findByTestId('company-desc')
    expect(description.innerText).toBe('Description')
    expect(description).toBeInTheDocument()
  })
  test('should render company website', async () => {
    const jobEl = screen.getByTestId('job')
    await userEvent.click(jobEl)
    const compWeb = await screen.findByRole('link', {
      name: 'company website'
    })
    expect(compWeb).toHaveAttribute('href', 'https://example.com')
    expect(compWeb).toHaveAccessibleName('company website')
    expect(compWeb).toBeInTheDocument()
  })
  test('should render location', () => {
    const location = screen.getByTestId('location')
    expect(location.innerText).toBe('Remote')
    expect(location).toBeInTheDocument()
  })
  test('should render company logo', () => {
    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('alt', 'Company logo - Company')
  })
  test('should render job duties', async () => {
    const jobEl = screen.getByTestId('job')
    await userEvent.click(jobEl)
    const duties = await screen.findByTestId('duties')
    expect(duties).toBeInTheDocument()
    expect(duties.innerHTML).toBe('<h1>hello</h1>')
    expect(duties.innerText).toBe('hello')
  })
})