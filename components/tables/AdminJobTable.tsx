import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

export const AdminJobTable = ({}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<TableColumn<{ [x: string]: string }>[]>([]);
  const [selectedRows, setSelectedRows] = useState<{ [x: string]: string }[]>([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch(`api/admin-area`);
        const jobs = await response.json();
        if (response.ok) {
          setData(jobs.data);
          setColumns(
            Object.keys(jobs.data[1]).map((q: string) => {
              return { name: q, selector: (row) => row[q], sortable: true };
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    };
    getJobs();
  }, []);

  const onClick = async () => {
    try {
      const formData = new FormData();

      formData.append('selectedRows', selectedRows.toString());
      const response = await fetch(`api/admin-area`, { method: 'DELETE', body: formData });
      const jobs = await response.json();
      if (response.ok) {
        setData(jobs.data);
        setColumns(
          Object.keys(jobs.data[1]).map((q: string) => {
            return { name: q, selector: (row) => row[q], sortable: true };
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DataTable
      onSelectedRowsChange={(rows) => setSelectedRows(rows.selectedRows)}
      actions={
        <button className="job__table-delete-action" onClick={onClick}>
          Delete
        </button>
      }
      responsive
      className="job__table"
      fixedHeaderScrollHeight="300px"
      subHeaderWrap
      columns={columns}
      data={data}
      dense
      clearSelectedRows
      selectableRows
      pagination
    />
  );
};
