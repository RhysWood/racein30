import React from 'react';
import { render, screen } from '@testing-library/react';
import VotingStats from '../VotingStats';

describe('VotingStats', () => {
  it('shows "No votes yet" prompt if no votes', () => {
    render(<VotingStats votes={{ fullRace: 0, raceIn30: 0 }} />);
    expect(screen.getByText(/No votes yet/i)).toBeInTheDocument();
  });

  it('shows total votes and correct percentages', () => {
    render(<VotingStats votes={{ fullRace: 3, raceIn30: 1 }} />);
    expect(screen.getByText(/4 votes/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Race 75%/i)).toBeInTheDocument();
    expect(screen.getByText(/Race in 30 25%/i)).toBeInTheDocument();
  });

  it('shows 50/50 split', () => {
    render(<VotingStats votes={{ fullRace: 2, raceIn30: 2 }} />);
    expect(screen.getByText(/4 votes/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Race 50%/i)).toBeInTheDocument();
    expect(screen.getByText(/Race in 30 50%/i)).toBeInTheDocument();
  });

  it('shows 100% for one option', () => {
    render(<VotingStats votes={{ fullRace: 0, raceIn30: 5 }} />);
    expect(screen.getByText(/5 votes/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Race 0%/i)).toBeInTheDocument();
    expect(screen.getByText(/Race in 30 100%/i)).toBeInTheDocument();
  });
});
