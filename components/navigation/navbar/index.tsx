import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import LoginButton from './LoginButton';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="navbar">
        <div className="navbar__container">
          <div className="navbar__container--inner">
            <Logo />
            <ul className="navbar__list">
              <li>
                <Link href="/">
                  <p>Upload Jobs</p>
                </Link>
              </li>
              <li>
                <Link href="/book-jobs">
                  <p>Book Jobs</p>
                </Link>
              </li>
              <li>
                <Link href="/admin-area">
                  <p>Admin Area</p>
                </Link>
              </li>
              <li>
                {session && <p>Signed in as {session.user!.email}</p>}
                {!session && <p>Not signed in</p>}
              </li>
              <li>
                <p>
                  <LoginButton />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
