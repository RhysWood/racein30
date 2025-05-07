import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from '../layout'

describe('RootLayout', () => {
  it('renders navigation and children', () => {
    render(
      <RootLayout>
        <div data-testid="test-content">Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('applies font classes', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    expect(document.documentElement).toHaveClass('mock-font-geist')
    expect(document.documentElement).toHaveClass('mock-font-geist-mono')
  })

  it('includes SEO metadata', () => {
    expect(metadata.title).toBeDefined()
    expect(metadata.description).toBeDefined()
  })
})
