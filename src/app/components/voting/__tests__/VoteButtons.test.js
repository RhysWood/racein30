import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VoteButtons from '../VoteButtons';

// Mock dependencies (correct relative path for your project structure)
jest.mock('../../../../utils/localStorage', () => ({
  hasVoted: jest.fn(),
  saveVote: jest.fn(),
}));
// eslint-disable-next-line
jest.mock('../../LoadingSkeleton', () => () => <div data-testid="loading-skeleton" />);

const { hasVoted, saveVote } = require('../../../../utils/localStorage');

describe('VoteButtons', () => {
  const raceId = 'race123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading skeleton when loading', async () => {
    hasVoted.mockReturnValue(false);
    // Keep fetch pending to simulate loading state
    global.fetch = jest.fn(() => new Promise(() => {}));
    render(<VoteButtons raceId={raceId} />);
    fireEvent.click(screen.getByText('Race in 30'));
    expect(await screen.findByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('disables buttons if already voted', () => {
    hasVoted.mockReturnValue('full');
    render(<VoteButtons raceId={raceId} />);
    expect(screen.getByText('Race in 30')).toBeDisabled();
    expect(screen.getByText('Full Race Replay')).toBeDisabled();
    expect(screen.getByText(/Thanks for voting/i)).toBeInTheDocument();
  });

  it('submits vote and shows thank you message', async () => {
    hasVoted.mockReturnValue(false);
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );
    render(<VoteButtons raceId={raceId} />);
    fireEvent.click(screen.getByText('Full Race Replay'));
    await waitFor(() =>
      expect(screen.getByText(/Thanks for voting for the/i)).toBeInTheDocument()
    );
    expect(saveVote).toHaveBeenCalledWith(raceId, 'full');
  });

  it('shows error if vote fails', async () => {
    hasVoted.mockReturnValue(false);
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    // Suppress expected error output
    jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<VoteButtons raceId={raceId} />);
    fireEvent.click(screen.getByText('Race in 30'));
    await waitFor(() =>
      expect(screen.getByText(/Failed to submit vote/i)).toBeInTheDocument()
    );
    console.error.mockRestore();
  });
});
