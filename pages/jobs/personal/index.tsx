import React, { useEffect, useState } from 'react';
import { IJob } from '@/interfaces/job.interface';
import Calender from '@/components/calendar/Index';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { getJobs } from '../helper';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/AccessDenied';

const MyJobs = () => {
  const { data: session, status } = useSession();

  // Job data for a user
  const [data, setData] = useState<IJob[]>([]);

  // get job data for a user
  useEffect(() => {
    getJobs(setData, undefined, true);
  }, [session]);

  // if no user, cannot view all jobs
  if (status === 'unauthenticated') {
    return <AccessDenied />;
  }

  return (
    <>
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <h2>Book Jobs</h2>
        <Calender unBookJob setData={setData} data={data} />;
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </>
  );
};

export default MyJobs;
