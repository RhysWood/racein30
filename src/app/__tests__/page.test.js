import { render, screen } from '@testing-library/react'
import Home from '../page'

jest.mock('../components/voting/TheRace', () => {
  return function MockTheRace() {
    return <div data-testid="mock-race">Race Component</div>
  }
})

jest.mock('../components/history/PreviousRaces', () => {
  return function MockPreviousRaces() {
    return <div data-testid="mock-previous-races">Previous Races</div>
  }
})

jest.mock('../components/SeasonProgress', () => {
  return function MockSeasonProgress() {
    return <div data-testid="mock-season-progress">Season Progress</div>
  }
})

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByTestId('mock-race')).toBeInTheDocument()
  })

  it('has proper layout structure', () => {
    render(<Home />)
    const mainContent = screen.getByRole('main')
    expect(mainContent).toBeInTheDocument()
  })

  it('renders season progress', () => {
    render(<Home />)
    expect(screen.getByTestId('mock-season-progress')).toBeInTheDocument()
  })

  it('renders previous races', () => {
    render(<Home />)
    expect(screen.getByTestId('mock-previous-races')).toBeInTheDocument()
  })
})
