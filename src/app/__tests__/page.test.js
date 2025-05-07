import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock the RaceWeekend component since it's a client component
jest.mock('../components/voting/TheRace', () => {
  return function MockTheRace() {
    return <div data-testid="mock-race">Race Component</div>
  }
})

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByTestId('mock-race')).toBeInTheDocument()
  })

  it('has proper layout structure', () => {
    render(<Home />)
    
    // Check for main content area
    const mainContent = screen.getByRole('main')
    expect(mainContent).toBeInTheDocument()
  })
})
