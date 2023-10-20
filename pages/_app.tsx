import HeadSEO from '@/components/HeadSEO';
import Navigation from '@/components/navigation';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/navbar.css';
import '../styles/table.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadSEO />
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}
