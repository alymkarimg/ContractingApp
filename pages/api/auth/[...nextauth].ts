import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '@/lib/mongoDbAdapter';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET!,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
