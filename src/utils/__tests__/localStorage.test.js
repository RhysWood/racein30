import { hasVoted, saveVote } from '../localStorage';

let store;
let localStorageMock;

beforeEach(() => {
  store = {};
  localStorageMock = {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    clear: jest.fn(() => { store = {}; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
  };
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    configurable: true,
    writable: true,
  });
  jest.clearAllMocks();
});

afterEach(() => {
  global.localStorage.clear();
});

describe('localStorage utils', () => {
  it('returns false if no vote exists', () => {
    expect(hasVoted('race1')).toBe(false);
  });

  it('returns true if vote exists', () => {
    global.localStorage.setItem('raceVotes', JSON.stringify({ race1: 'upvote' }));
    expect(hasVoted('race1')).toBe(true);
  });

  it('saves a vote and can detect it', () => {
    saveVote('race2', 'downvote');
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'raceVotes',
      JSON.stringify({ race2: 'downvote' })
    );
    expect(hasVoted('race2')).toBe(true);
  });
});
