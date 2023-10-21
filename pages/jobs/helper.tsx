import { IJob } from '@/interfaces/job.interface';
import DOMPurify from 'dompurify';
import { FaPenSquare } from 'react-icons/fa';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { TableColumn } from 'react-data-table-component';
import Swal from 'sweetalert2';
import _ from 'lodash';

// navigate to edit page
const onClick = async (id: string, router: NextRouter) => {
  const result = await Swal.fire({
    heightAuto: false,
    title: 'Do you want to edit the selected item?',
    showDenyButton: true,
    confirmButtonText: 'Edit',
  });

  if (result.isConfirmed) {
    router.push(`/jobs/${id}`);
  } else if (result.isDenied) {
    Swal.fire('Item is not edited', '', 'info');
  }
};

// jobs columns for table
const columns = (router: NextRouter): TableColumn<IJob>[] => {
  return [
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
      selector: (row: IJob) => _.capitalize(row.occupation),
      sortable: true,
    },
    {
      width: '30rem',
      name: 'Description',
      sortable: true,
      selector: (row: IJob) => DOMPurify.sanitize(row.description ?? ''),
      cell: (row: IJob) => (
        <div
          className="job__table-description"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.description != '' ? row.description! : DOMPurify.sanitize('<b>N/A</b>')) }}
        ></div>
      ),
    },
    {
      name: 'Edit Job',
      cell: (row: IJob) => {
        return (
          <button onClick={() => onClick(row._id, router)}>
            <FaPenSquare size={20} />
          </button>
        );
      },
    },
  ];
};

type GetJobs = (
  setData: Dispatch<SetStateAction<IJob[]>>,
  columns?: {
    setColumns: Dispatch<SetStateAction<TableColumn<IJob>[]>>;
    router: NextRouter;
  },
  myJobs?: boolean
) => void;

// get jobs
export const getJobs: GetJobs = async (setData, cols, myJobs = false) => {
  try {
    // if cols, set columns
    const response = myJobs ? await fetch(`../api/jobs/myJobs`) : await fetch(`../api/jobs/allJobs`);
    const jobs = await response.json();

    if (response.ok) {
      setData(jobs.data);
      if (cols) {
        const { setColumns, router } = cols;
        setColumns ? setColumns(columns(router)) : undefined;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

// get form data
export const getFormData = async (setData: Dispatch<SetStateAction<IJob | undefined>>, id: string) => {
  const response = await fetch(`../api/jobs?id=${id}`);
  const job = await response.json();
  setData(job.data);
};
