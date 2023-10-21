import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './components/Logo';
import LoginButton from './components/LoginButton';
import { useSession } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';

const Navigation = () => {
  const { data: session, status } = useSession();
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__container--inner">
          <Logo />
          {(status !== 'loading' && (
            <ul className="navbar__list">
              {/* employers can modify jobs */}
              {session?.user.role === 'employer' && (
                <li>
                  <Link href="/jobs/admin">
                    <p>Admin Area</p>
                  </Link>
                </li>
              )}
              {/* only employers can add jobs */}
              {session?.user.role === 'employer' && (
                <li>
                  <Link href="/jobs/add">
                    <p>Upload Job</p>
                  </Link>
                </li>
              )}
              {/* employees and employers can book jobs */}
              {status !== 'unauthenticated' && (
                <li>
                  <Link href="/jobs/all">
                    <p>All Jobs</p>
                  </Link>
                </li>
              )}
              {/* employees and employers can view jobs */}
              {status !== 'unauthenticated' && (
                <li>
                  <Link href={`/jobs/personal`}>
                    <p>My Jobs</p>
                  </Link>
                </li>
              )}
              {session && (
                <li>
                  <p>Signed in as {session.user!.email}</p>
                </li>
              )}
              <li>
                <p>
                  <LoginButton />
                </p>
              </li>
            </ul>
          )) || <Skeleton count={10} height={20} />}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
