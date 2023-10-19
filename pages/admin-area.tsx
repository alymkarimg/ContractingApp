import AdminJobTable from '@/components/tables/AdminJobTable';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TableColumn } from 'react-data-table-component';
import { FaPenSquare } from 'react-icons/fa';
import { IJob } from '@/interfaces/job.interface';

export async function getServerSideProps({ query }: { query: { success?: string } }) {
  return {
    props: { success: query && query.success ? query.success : '' },
  };
}

export default function AdminArea({ success }: { success?: string }) {
  const router = useRouter();
  const [data, setData] = useState<IJob[]>([]);
  const [columns, setColumns] = useState<TableColumn<IJob>[]>([]);
  const getJobs = async () => {
    try {
      const response = await fetch(`api/admin-area`);
      const jobs = await response.json();

      if (response.ok) {
        setData(jobs.data);
        const columns = [
          {
            name: 'Title',
            selector: (row: IJob) => row.title,
            sortable: true,
          },
          {
            name: 'Location',
            selector: (row: IJob) => row.address,
            sortable: true,
          },
          {
            name: 'Start',
            selector: (row: IJob) => new Date(row.datetime__start!).toLocaleString(),
            sortable: true,
          },
          {
            name: 'End',
            selector: (row: IJob) => new Date(row.datetime__end!).toLocaleString(),
            sortable: true,
          },
          {
            name: 'Pay',
            selector: (row: IJob) => `£${row.pay / 100}`,
            sortable: true,
          },
          {
            name: 'Occupation',
            selector: (row: IJob) => row.occupation,
            sortable: true,
          },
          {
            width: '30rem',
            name: 'Description',
            sortable: true,
            selector: (row: IJob) => DOMPurify.sanitize(row.description),
            cell: (row: IJob) => (
              <div
                className="job__table-description"
                dangerouslySetInnerHTML={{ __html: row.description != '' ? row.description : DOMPurify.sanitize('<b>N/A</b>') }}
              ></div>
            ),
          },
          {
            name: 'Edit Job',
            cell: (row: IJob) => (
              <Link aria-label="delete" color="secondary" href={`/${row._id}`}>
                <FaPenSquare size={20} />
              </Link>
            ),
          },
        ];

        setColumns(columns);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('Job Successfully updated') }} />);
      window.history.replaceState(null, '', '/admin-area');
      getJobs();
    }
    // reset toast
  }, [router, success]);

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
}
