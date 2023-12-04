import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { SpinnerDotted } from 'spinners-react';
import { IJob } from '@/interfaces/job.interface';
import { onClickDelete } from './TableHelper';
import { useToasts } from '../Helper';

const JobTable = ({
  data,
  columns,
  setData,
  isAdmin
}: {
  data: IJob[];
  columns: TableColumn<IJob>[];
  setData: Dispatch<SetStateAction<IJob[]>>;
  isAdmin: boolean
}) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<IJob[]>([]);
  const [toggledClearRows, setToggledClearRows] = useState<boolean>(false);
  const [pending, setPending] = useState(true);

  // loading state for table
  useEffect(() => {
    const timeout = setTimeout(async () => {
      await setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [data]);

  // fire toasts if error or success is set
  useToasts(success, setSuccess, error, setError);

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
          isAdmin ?
          <button
            className={selectedRows.length > 0 ? 'job__table-delete-action' : 'hidden'}
            onClick={() => onClickDelete(selectedRows, setSelectedRows, data, setData, toggledClearRows, setToggledClearRows, setSuccess, setError)}
          >
            <FaTrash size={20} />
          </button> : undefined
        }
        responsive
        className="job__table"
        fixedHeaderScrollHeight="300px"
        subHeaderWrap
        columns={columns}
        data={data}
        dense
        selectableRows={isAdmin ? true : false}
        pagination
        clearSelectedRows={toggledClearRows}
        progressPending={pending}
        progressComponent={<SpinnerDotted className="job__table__spinner" color="var(--primary)" />}
      />
    </div>
  );
};

export default JobTable;
