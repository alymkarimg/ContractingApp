import { GetServerSidePropsContext } from 'next';
import { IResponse } from '../interfaces/response.interface';
import JobUploadForm from '@/components/Forms/JobUploadForm';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const isProd = String(process.env.NODE_ENV) === 'production'
  const isDev = String(process.env.NODE_ENV) === 'development'
  
  const LOCAL_HOST = 'http://localhost:3000'
  
  const getProdPath = () => {
    const currentBranch = process.env.VERCEL_GITHUB_COMMIT_REF!.toLowerCase()
      .replace('/', '-')
      .replace('_', '-')
  
    if (currentBranch === 'main') {
      return process.env.WEB_URI // we have a production URL env in the project we are working on
    }
    return `https://contracting-app${currentBranch}.vercel.app`
  }
  
  const url = isProd ? getProdPath() : LOCAL_HOST
  
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
