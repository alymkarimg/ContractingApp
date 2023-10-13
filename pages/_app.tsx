import HeadSEO from '@/components/HeadSEO';
import '../styles/globals.css';
import '../styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadSEO />
      <Component {...pageProps} />
    </>
  );
}
