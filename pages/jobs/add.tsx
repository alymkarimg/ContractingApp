import JobUploadForm from '@/components/forms/JobUploadForm';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/AccessDenied';

const AddJob = ({ apiKey }: { apiKey: string }) => {
  const { data: session, status } = useSession();

  // if not an employer, cannot add a job
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
        <h2>Job Upload</h2>
        <JobUploadForm isAddMode={true} apiKey={apiKey} />
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </main>
  );
};

export default AddJob;
