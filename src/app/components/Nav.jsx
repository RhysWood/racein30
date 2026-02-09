'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Vote' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/analytics', label: 'Analytics' },
  ];

  return (
    <nav className="flex items-center justify-between w-full py-4 border-b border-card-border">
      <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
        <Image
          src="/assets/logo1.png"
          priority
          alt="racein30 Logo"
          width={36}
          height={36}
          className="object-contain"
        />
        <span className="text-lg font-bold tracking-tight">racein30</span>
      </Link>
      <div className="flex gap-6">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-racing-red ${
              pathname === link.href ? 'text-racing-red' : 'text-muted'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
