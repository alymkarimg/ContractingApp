import JobUploadForm from '@/components/forms/JobUploadForm';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IJob } from '@/interfaces/job.interface';
import { getFormData } from '@/components/Helper';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/AccessDenied';

export async function getServerSideProps({ params }: { params: { jobId: string } }) {
  return {
    props: { jobId: params.jobId },
  };
}

const EditJob = ({ apiKey, jobId }: { apiKey: string; jobId: string }) => {
  // job data for a single job
  const [data, setData] = useState<IJob | undefined>();

  // get job data for a single job
  useEffect(() => {
    getFormData(setData, jobId);
  }, [jobId]);

  const { data: session, status } = useSession();

  // if not employer, cannot edit a job
  if (status === 'loading' || session?.user.role !== 'employer') {
    return <AccessDenied />;
  }

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
        <h2>Edit Job</h2>
        <JobUploadForm isAddMode={false} apiKey={apiKey} data={data} />
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </main>
  );
};

export default EditJob;
