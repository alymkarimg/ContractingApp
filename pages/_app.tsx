import Navigation from '@/components/navigation/Index';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// import '../styles/globals.css';
// import '../styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/navbar.css';
// import '../styles/table.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar.css';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navigation {...pageProps} />
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
