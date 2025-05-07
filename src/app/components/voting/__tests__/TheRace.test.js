import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TheRace from '../TheRace';

// Mock child components
// eslint-disable-next-line
jest.mock('../VoteButtons', () => () => <div data-testid="vote-buttons" />);
// eslint-disable-next-line
jest.mock('../VotingStats', () => ({ votes }) => <div data-testid="voting-stats">{votes ? 'Stats' : ''}</div>);

describe('TheRace', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading initially', () => {
    render(<TheRace />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches and displays race data', async () => {
    const mockRace = {
      _id: 'race123',
      race: 'Monaco Grand Prix',
      date: '2025-05-25T00:00:00.000Z',
      votes: { up: 10, down: 2 },
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockRace),
      })
    );

    render(<TheRace />);

    // Wait for race name to appear
    await waitFor(() => expect(screen.getByText('Monaco Grand Prix')).toBeInTheDocument());
    // Accept either May 24 or May 25 to avoid timezone issues
    expect(
      screen.getByText((text) => /^May (24|25)$/.test(text))
    ).toBeInTheDocument();
    expect(screen.getByTestId('voting-stats')).toBeInTheDocument();
    expect(screen.getByTestId('vote-buttons')).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));
    // eslint-disable-next-line
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<TheRace />);
    await waitFor(() => expect(screen.getByText(/loading/i)).toBeInTheDocument());

    // eslint-disable-next-line
    console.error.mockRestore();
  });
});
