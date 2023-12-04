import { IJob } from '@/interfaces/job.interface';
import DOMPurify from 'dompurify';
import _ from 'lodash';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { TableColumn } from 'react-data-table-component';
import { FaPenSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const onClickDelete = async (
  selectedRows: IJob[],
  setSelectedRows: Dispatch<SetStateAction<IJob[]>>,
  data: IJob[],
  setData: Dispatch<SetStateAction<IJob[]>>,
  toggledClearRows: boolean,
  setToggledClearRows: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<string | null>>,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  const result = await Swal.fire({
    heightAuto: false,
    title: 'Do you want to delete the selected items?',
    showDenyButton: true,
    confirmButtonText: 'Delete',
    denyButtonText: `Don't delete`,
  });
  if (result.isConfirmed) {
    try {
      if (selectedRows.length <= 0) {
        toast.warning('Please select a job to delete.');
        return;
      }

      const formData = new FormData();
      formData.append('selectedRows', JSON.stringify(selectedRows));

      const response = await fetch(`../api/jobs/allJobs`, { method: 'PUT', body: formData });
      const body = await response.json();
      if (response.ok) {
        setSuccess(body.message);
        const newRows = data.filter((el) => !selectedRows.includes(el));
        setData(newRows);
        setSelectedRows([]);
        setToggledClearRows(!toggledClearRows);
      }
    } catch (e) {
      console.log(e);
      setError((e as { message: string }).message);
    }
  } else if (result.isDenied) {
    Swal.fire("Item'(s) are not deleted", '', 'info');
    setSelectedRows([]);
    setToggledClearRows(!toggledClearRows);
  }
};

// navigate to edit page
const onClick = async (id: string, router: NextRouter) => {
  const result = await Swal.fire({
    heightAuto: false,
    title: 'Do you want to edit the selected item?',
    showDenyButton: true,
    confirmButtonText: 'Yes',
  });

  if (result.isConfirmed) {
    router.push(`/jobs/${id}`);
  } else if (result.isDenied) {
    Swal.fire('Item is not edited', '', 'info');
  }
};

// jobs columns for table
export const AdminTableHeaderColumns = (router: NextRouter): TableColumn<IJob>[] => {
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

// jobs columns for table
export const TableHeaderColumns = (): TableColumn<IJob>[] => {
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
  ];
};
