'use client';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <nav className="flex justify-between w-full mb-2 pt-3 relative">
      <Link href="/" className="flex gap-2">
        <Image
          src="/assets/logo.png"
          priority
          alt="logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </Link>
      <div>LOCALE</div>
    </nav>
  );
};

export default Nav;
