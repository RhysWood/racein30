import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TheRace from '../TheRace';

// Mock child components
// eslint-disable-next-line
jest.mock('../VoteButtons', () => () => <div data-testid="vote-buttons" />);
// eslint-disable-next-line
jest.mock('../VotingStats', () => ({ votes }) => <div data-testid="voting-stats">{votes ? 'Stats' : ''}</div>);
// eslint-disable-next-line
jest.mock('../../LoadingSkeleton', () => () => <div data-testid="loading-skeleton" />);

describe('TheRace', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading skeleton initially', () => {
    global.fetch = jest.fn(() => new Promise(() => {}));
    render(<TheRace />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('fetches and displays race data', async () => {
    const mockData = {
      currentRace: {
        _id: 'race123',
        race: 'Monaco',
        date: '2026-06-07T00:00:00.000Z',
        sprint: false,
        votes: { fullRace: 10, raceIn30: 2 },
      },
      nextRace: {
        _id: 'race124',
        race: 'Barcelona',
        date: '2026-06-14T00:00:00.000Z',
        sprint: false,
        votes: { fullRace: 0, raceIn30: 0 },
      },
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    render(<TheRace />);

    await waitFor(() => expect(screen.getByText('Monaco')).toBeInTheDocument());
    expect(screen.getByTestId('voting-stats')).toBeInTheDocument();
    expect(screen.getByTestId('vote-buttons')).toBeInTheDocument();
  });

  it('shows sprint badge for sprint weekends', async () => {
    const mockData = {
      currentRace: {
        _id: 'race123',
        race: 'China',
        date: '2026-03-15T00:00:00.000Z',
        sprint: true,
        votes: { fullRace: 5, raceIn30: 3 },
      },
      nextRace: null,
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    render(<TheRace />);

    await waitFor(() => expect(screen.getByText('Sprint Weekend')).toBeInTheDocument());
  });

  it('shows pre-season countdown when no current race', async () => {
    const mockData = {
      currentRace: null,
      nextRace: {
        _id: 'race1',
        race: 'Australia',
        date: '2026-03-08T00:00:00.000Z',
        sprint: false,
        votes: { fullRace: 0, raceIn30: 0 },
      },
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    render(<TheRace />);

    await waitFor(() => expect(screen.getByText('Australia')).toBeInTheDocument());
    expect(screen.getByText(/Season starts with/i)).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));
    // eslint-disable-next-line
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<TheRace />);
    await waitFor(() => expect(screen.getByText(/No race data available/i)).toBeInTheDocument());

    // eslint-disable-next-line
    console.error.mockRestore();
  });
});
