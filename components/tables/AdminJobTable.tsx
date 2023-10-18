import Link from 'next/link';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import { FaTrash, FaPenSquare } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { SpinnerDotted } from 'spinners-react';

interface Row {
  [x: string]: string;
}

const AdminJobTable = () => {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<TableColumn<{ [x: string]: string }>[]>([]);
  const [selectedRows, setSelectedRows] = useState<{ [x: string]: string }[]>([]);
  const [toggledClearRows, setToggledClearRows] = useState<boolean>(false);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch(`api/admin-area`);
        const jobs = await response.json();

        if (response.ok) {
          setData(jobs.data);
          const columns = [
            {
              name: 'Title',
              selector: (row: Row) => row.title,
              sortable: true,
            },
            {
              name: 'Location',
              selector: (row: Row) => row.address,
              sortable: true,
            },
            {
              name: 'Start',
              selector: (row: Row) => new Date(row.datetime__start!).toLocaleString(),
              sortable: true,
            },
            {
              name: 'End',
              selector: (row: Row) => new Date(row.datetime__end!).toLocaleString(),
              sortable: true,
            },
            {
              name: 'Pay',
              selector: (row: Row) => `£${parseInt(row.pay) / 100}`,
              sortable: true,
            },
            {
              name: 'Occupation',
              selector: (row: Row) => row.occupation,
              sortable: true,
            },
            {
              width: '30rem',
              name: 'Description',
              sortable: true,
              selector: (row: Row) => DOMPurify.sanitize(row.description),
              cell: (row: Row) => (
                <div
                  className="job__table-description"
                  dangerouslySetInnerHTML={{ __html: row.description != '' ? row.description : DOMPurify.sanitize('<b>N/A</b>') }}
                ></div>
              ),
            },
            {
              name: 'Edit Job',
              cell: (row: Row) => (
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
    const timeout = setTimeout(async () => {
      await getJobs();
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (error) toast.error(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }} />);
    // reset toast
    setError(null);
  }, [error]);

  useEffect(() => {
    if (success) toast.success(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(success) }} />);
    // reset toast
    setSuccess(null);
  }, [success]);

  const onClick = async () => {
    try {
      if (selectedRows.length <= 0) {
        toast.warning('Please select a job to delete.');
        return;
      }

      const formData = new FormData();
      formData.append('selectedRows', JSON.stringify(selectedRows));

      const response = await fetch(`/api/admin-area`, { method: 'PUT', body: formData });
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
  };

  return (
    <div className="job__table">
      <DataTable
        onSelectedRowsChange={(rows) => {
          setSelectedRows(rows.selectedRows as []);
          if (rows.selectedRows.length <= 0) {
            setToggledClearRows(!toggledClearRows);
          }
        }}
        actions={
          <button className={selectedRows.length > 0 ? 'job__table-delete-action' : 'hidden'} onClick={onClick}>
            <FaTrash size={20} />
          </button>
        }
        responsive
        className="job__table"
        fixedHeaderScrollHeight="300px"
        subHeaderWrap
        columns={columns}
        data={data}
        dense
        selectableRows
        pagination
        clearSelectedRows={toggledClearRows}
        progressPending={pending}
        progressComponent={<SpinnerDotted color="var(--primary)" />}
      />
      ;
    </div>
  );
};

export default AdminJobTable;
