import DOMPurify from 'dompurify';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TableHeaderColumns } from '@/components/tables/TableHelper';
import { IJob } from '@/interfaces/job.interface';
import { NextRouter } from 'next/router';
import { TableColumn } from 'react-data-table-component';

export const useToasts = (
  success: string | null,
  setSuccess: Dispatch<SetStateAction<string | null>>,
  error: string | null,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  useEffect(() => {
    if (error) toast.error(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }} />);
    // reset toast
    setError(null);
  }, [error, setError]);

  useEffect(() => {
    if (success) toast.success(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(success) }} />);
    // reset toast
    setSuccess(null);
  }, [setSuccess, success]);
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
        setColumns ? setColumns(TableHeaderColumns(router)) : undefined;
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
