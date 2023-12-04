import React, { useEffect, useState } from 'react';
import { IJob } from '@/interfaces/job.interface';
import Calender from '@/components/calendar/Index';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { getJobs } from '@/components/Helper';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/AccessDenied';
import JobTable from '@/components/tables/JobTable';
import { TableColumn } from 'react-data-table-component';
import { TableHeaderColumns } from '@/components/tables/TableHelper';

const MyJobs = () => {
  const { data: session, status } = useSession();

  // Job data for a user
  const [data, setData] = useState<IJob[]>([]);

  // columns for the table
  const [columns, setColumns] = useState<TableColumn<IJob>[]>([]);

  // get jobs on pageload
  useEffect(() => {
    setColumns(TableHeaderColumns())
  }, []);

  // get job data for a user
  useEffect(() => {
    getJobs(setData, undefined, true);
  }, [session]);

  // if no user, cannot view all jobs
  if (status === 'loading' || status === 'unauthenticated') {
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
        <Calender unBookJob setData={setData} data={data} />
        <h2>Job Details</h2>
        <JobTable isAdmin={false} data={data} setData={setData} columns={columns}/>
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
