import { GetServerSidePropsContext } from 'next';
import { IResponse } from '../interfaces/response.interface';
import JobUploadForm from '@/components/Forms/JobUploadForm';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  let url;
  if(process.env.NODE_ENV !== 'production') {
    url = req.headers.referer;
    let arr = url!.split('/');
    url =  `${arr[0]}//${arr[2]}`;
  } else {
    url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
  }
  const res = await fetch(`${url}/api/`);
  const data: IResponse = await res.json();
  return { props: { data } };
};

export default function Home({ data }: { data: IResponse }) {
  return (
    <main>
      <div className="container">
        <h1 className="page__title">Contracting App</h1>
        <h2>Job Upload</h2>
        <JobUploadForm />
      </div>
      <footer>
        <p>
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </main>
  );
}
