import React, { useCallback, useEffect, useState } from 'react';
import { IJob } from '@/interfaces/job.interface';
import Calender from '@/components/calender';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';

const BookJobs = () => {
  const [data, setData] = useState<IJob[]>([]);
  const getJobs = useCallback(async () => {
    try {
      const response = await fetch(`api/admin-area`);
      const jobs = await response.json();

      if (response.ok) {
        setData(jobs.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

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
        <Calender data={data} />;
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </>
  );
};

export default BookJobs;
