import NextAuth from 'next-auth';
import type { NextAuthOptions, User } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongoDbAdapter';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.VERCEL_ENV === 'production' ? `${process.env.DATABASE_NAME}_production` : `${process.env.DATABASE_NAME}`,
  }),
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  // Configure one or more authentication providers
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    //whatever value we return here will be the value of the next-auth session
    async session({ session, token, user }) {
      return {
        ...session,
        user: { ...session.user, ...user, ...token.user! }, // combine the session and db user
      };
    },
  },
  providers: [
    process.env.VERCEL_ENV === 'preview'
      ? CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: {
              label: 'Username',
              type: 'text',
              placeholder: 'Please type in your username...',
            },
            password: { label: 'Password', type: 'password' },
          },
          async authorize(credentials): Promise<User | null> {
            const employee = {
              id: '1',
              name: 'employee',
              email: 'employee@example.com',
              image: 'https://i.pravatar.cc/150?u=jsmith@example.com',
              password: process.env.EMPLOYEE_PASSWORD,
              role: 'employee',
            };
            const employer = {
              id: '1',
              name: 'employer',
              email: 'employer@example.com',
              image: 'https://i.pravatar.cc/150?u=jsmith@example.com',
              password: process.env.EMPLOYER_PASSWORD,
              role: 'employer',
            };

            if (credentials?.username.toLowerCase() === employee.name && credentials?.password === employee.password) {
              return employee;
            } else if (credentials?.username === employer.name && credentials?.password === employer.password) {
              return employer;
            } else {
              return null;
            }
          },
        })
      : GoogleProvider({
          clientId: process.env.GOOGLE_ID!,
          clientSecret: process.env.GOOGLE_SECRET!,
          async profile(profile) {
            return {
              id: profile.sub, // I'd prefer not to have this but not supplying an id causes a TypeScript error
              role: 'employee',
              email: profile.email,
              emailVerified: profile.email_verified,
              name: profile.name,
              image: profile.picture,
            };
          },
        }),
  ],
};

export default NextAuth(authOptions);
