import Link from 'next/link';

const Logo = () => {
  return (
    <>
      <Link href="/jobs/add">
        <h1 className="page__title">Contracting App</h1>
      </Link>
    </>
  );
};

export default Logo;
