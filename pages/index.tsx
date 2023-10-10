import { IResponse } from '../interfaces/response.interface';
import JobUploadForm from '@/components/Forms/JobUploadForm';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_BASEURL}`);
  const data: IResponse = await res.json();
  return { props: { data } };
}

export default function Home({ data }: { data: IResponse }) {
  return (
    <main >
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
