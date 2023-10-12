import { GetServerSidePropsContext } from 'next';
import { IResponse } from '../interfaces/response.interface';
import JobUploadForm from '@/components/Forms/JobUploadForm';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  let url;
  if (process.env.NODE_ENV !== 'production') {
    url = 'http://localhost:3000';
  } else {
    url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  const res = await fetch(`${url}/api/`);
  const data: IResponse = await res.json();
  return { props: { data, apiKey: process.env.TOMTOM_API_KEY } };
};

export default function Home({ data, apiKey }: { data: IResponse; apiKey: string }) {
  return (
    <main>
      <div className="container">
        <h1 className="page__title">Contracting App</h1>
        <h2>Job Upload</h2>
        <JobUploadForm apiKey={apiKey} />
      </div>
      <footer>
        <p>
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </p>
      </footer>
    </main>
  );
}
