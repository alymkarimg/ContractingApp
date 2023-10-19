import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';
import { FaTrash, FaPenSquare } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { SpinnerDotted } from 'spinners-react';
import { IJob } from '@/interfaces/job.interface';

const AdminJobTable = ({
  data,
  columns,
  setData,
}: {
  data: IJob[];
  columns: TableColumn<IJob>[];
  setData: Dispatch<SetStateAction<IJob[]>>;
  setColumns: Dispatch<SetStateAction<TableColumn<IJob>[]>>;
}) => {
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<IJob[]>([]);
  const [toggledClearRows, setToggledClearRows] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [data]);

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
