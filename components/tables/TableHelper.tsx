import { IJob } from '@/interfaces/job.interface';
import { Dispatch, SetStateAction } from 'react';
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
