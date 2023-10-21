import React, { useEffect, useState } from 'react';
import { IJob } from '@/interfaces/job.interface';
import Calender from '@/components/calendar/Index';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { getJobs } from './helper';
import AccessDenied from '@/components/AccessDenied';
import { useSession } from 'next-auth/react';

const AllJobs = () => {
  // set job data
  const [data, setData] = useState<IJob[]>([]);

  useEffect(() => {
    getJobs(setData);
  }, []);

  const { status } = useSession();

  // if not an employee, cannot book a job
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
        <Calender setData={setData} data={data} />;
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </>
  );
};

export default AllJobs;
