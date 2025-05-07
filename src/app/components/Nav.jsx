'use client';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <nav className="flex justify-center w-full mb-2 pt-3 relative">
      <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
        <Image
          src="/assets/logo1.png"
          priority
          alt="Racein30 Logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </Link>
    </nav>
  );
};

export default Nav;
