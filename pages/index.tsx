import JobUploadForm from '@/components/forms/JobUploadForm';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';

export default function Home({ apiKey }: { apiKey: string }) {
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
