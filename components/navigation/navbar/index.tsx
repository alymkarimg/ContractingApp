import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Button from './Button';

const Navbar = () => {
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
                <Link href="/book-job">
                  <p>Book Jobs</p>
                </Link>
              </li>
              <li>
                <Link href="/admin-job">
                  <p>Admin Area</p>
                </Link>
              </li>
              <li>
                <p>
                  <Button />
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
