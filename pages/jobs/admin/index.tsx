import AdminJobTable from '@/components/tables/AdminJobTable';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import { TableColumn } from 'react-data-table-component';
import { IJob } from '@/interfaces/job.interface';
import { getJobs } from '../helper';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/AccessDenied';

export async function getServerSideProps({ query }: { query: { success?: string } }) {
  return {
    props: { success: query && query.success ? query.success : '' },
  };
}

const AdminJobs = ({ success }: { success?: string }) => {
  // set up router for redirect to edit job page
  const router = useRouter();

  // set table column and data
  const [data, setData] = useState<IJob[]>([]);
  const [columns, setColumns] = useState<TableColumn<IJob>[]>([]);

  // get jobs on page load
  useEffect(() => {
    getJobs(setData, { setColumns, router });
  }, [router]);

  // if query string === success, fire toast, reload jobs and remove query string
  useEffect(() => {
    if (success) {
      toast.success(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('Job successfully updated') }} />);
      window.history.replaceState(null, '', '/jobs/all');
      getJobs(setData, { setColumns, router });
    }
  }, [router, success]);

  const { data: session } = useSession();

  // if not an employer, cannot view all jobs
  if (session?.user.role !== 'employer') {
    return <AccessDenied />;
  }

  return (
    <main>
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
        <h2>View/Edit/Delete Jobs</h2>
        <AdminJobTable data={data} columns={columns} setColumns={setColumns} setData={setData} />
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </main>
  );
};

export default AdminJobs;
