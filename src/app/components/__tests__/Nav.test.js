import { render, screen } from '@testing-library/react';
import Nav from '../Nav';

describe('Nav Component', () => {
  it('renders the logo link', () => {
    render(<Nav />);
    const logoLink = screen.getByRole('link', { name: /Go to homepage/i });
    expect(logoLink).toBeInTheDocument();
  });
});
