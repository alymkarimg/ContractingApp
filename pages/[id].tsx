import JobUploadForm from '@/components/forms/JobUploadForm';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IJob } from '@/interfaces/job.interface';

export async function getServerSideProps({ params }: { params: { id: string } }) {
  return {
    props: { id: params.id },
  };
}

export default function Edit({ apiKey, id }: { apiKey: string; id: string }) {
  const [data, setData] = useState<IJob>();

  useEffect(() => {
    const getFormData = async () => {
      const response = await fetch(`/api?id=${id}`);
      const job = await response.json();
      setData(job.data);
    };
    getFormData();
  }, [id]);

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
}
