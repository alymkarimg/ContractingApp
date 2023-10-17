import JobUploadForm from '@/components/forms/JobUploadForm';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { IResponse } from '@/interfaces/response.interface';

export const getServerSideProps = async () => {
  let url;
  if (process.env.NODE_ENV !== 'production') {
    url = 'http://localhost:3000';
  } else {
    url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  const res = await fetch(`${url}/api/`);
  const data: IResponse = await res.json();
  return { props: { data, apiKey: process.env.GOOGLE_API_KEY } };
  return { props: { apiKey: process.env.GOOGLE_API_KEY } };
};

export default function Home({ apiKey }: { data: IResponse; apiKey: string }) {
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
        <JobUploadForm apiKey={apiKey} />
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </main>
  );
}
