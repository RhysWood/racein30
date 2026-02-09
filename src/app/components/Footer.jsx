import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-card-border mt-16 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          racein30 &mdash; Community F1 race recommendations
        </p>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">Vote</Link>
          <Link href="/calendar" className="hover:text-foreground transition-colors">Calendar</Link>
          <Link href="/analytics" className="hover:text-foreground transition-colors">Analytics</Link>
        </div>
      </div>
    </footer>
  );
}
