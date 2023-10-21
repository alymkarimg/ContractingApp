import { useSession, signIn, signOut } from 'next-auth/react';
export default function LoginButton() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <button className="button button--teal" onClick={() => signOut()}>
        Sign out
      </button>
    );
  }
  return (
    <button className="button button--teal" onClick={() => signIn()}>
      Sign in
    </button>
  );
}
