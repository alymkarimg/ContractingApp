import { GetServerSidePropsContext } from 'next';
import { IResponse } from '../interfaces/response.interface';
import JobUploadForm from '@/components/Forms/JobUploadForm';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  let url = req.headers.referer;
  url =  process.env.NODE_ENV === 'production' ? req.headers['x-vercel-deployment-url'] : `${url!.split('/')[0]}//${url!.split('/')[2]}`;
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
