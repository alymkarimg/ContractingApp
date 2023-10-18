import AdminJobTable from '@/components/tables/AdminJobTable';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';

export async function getServerSideProps({ query }: { query: { success?: string } }) {
  return {
    props: { success: query && query.success ? query.success : '' },
  };
}

export default function AdminArea({ success }: { success?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (success) {
      toast.success(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('Job Successfully updated') }} />);
      window.history.replaceState(null, '', '/admin-area');
    }
    // reset toast
  }, [router, success]);

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
        <h2>View/Edit/Delete Jobs</h2>
        <AdminJobTable />
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </main>
  );
}
