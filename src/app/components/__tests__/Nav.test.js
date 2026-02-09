import { render, screen } from '@testing-library/react';
import Nav from '../Nav';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Nav Component', () => {
  it('renders the logo link', () => {
    render(<Nav />);
    const logoLink = screen.getByRole('link', { name: /Go to homepage/i });
    expect(logoLink).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Nav />);
    expect(screen.getByText('Vote')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('renders the brand name', () => {
    render(<Nav />);
    expect(screen.getByText('racein30')).toBeInTheDocument();
  });
});
