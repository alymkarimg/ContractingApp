import Link from 'next/link';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import { FaTrash, FaPenSquare } from 'react-icons/fa';

const AdminJobTable = () => {
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
          setColumns([
            ...Object.keys(jobs.data[0]).map((q: string) => {
              return {
                name: q,
                selector: (row: { [x: string]: string }) => row[q],
                sortable: true,
              };
            }),
            {
              cell: (row) => (
                <Link aria-label="delete" color="secondary" href={`/${row._id}`}>
                  <FaPenSquare size={30} />
                </Link>
              ),
            },
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getJobs();
  }, []);

  useEffect(() => {
    if (error) toast.error(<ul dangerouslySetInnerHTML={{ __html: error }} />);
    // reset toast
    setError(null);
  }, [error]);

  useEffect(() => {
    if (success) toast.success(<ul dangerouslySetInnerHTML={{ __html: success }} />);
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
          if (rows.selectedRows.length > 0) setSelectedRows(rows.selectedRows as []);
        }}
        actions={
          <button className="job__table-delete-action" onClick={onClick}>
            <FaTrash size={30} />
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
      />
      ;
    </div>
  );
};

export default AdminJobTable;
