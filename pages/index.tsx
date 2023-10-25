import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import ModelEditor from '@/components/modelEditor/ModelEditor';

const Index = () => {
  return (
    <>
      <div className="flex w-full justify-center">
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
        <div className="max-w-sm container">
          <h2>Home</h2>
          <ModelEditor />
        </div>
      </div>
      <footer>
        <p>
          Powered by <Image width={90} height={90} src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </>
  );
};

export default Index;
