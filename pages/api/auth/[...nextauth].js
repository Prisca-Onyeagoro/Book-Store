import Users from '@/Database/BookUserSchema';
import dbconn from '@/Database/dbconn';
import { compare } from 'bcryptjs';
import { Error } from 'mongoose';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: 'Credentials',
      async authorize(credentials, req) {
        dbconn().catch((error) => {
          error: 'connection failed';
        });
        //  check if user exists
        const userexists = await Users.findOne({ email: credentials.email });

        if (!userexists) {
          throw new Error('User not found Kindly SignIn');
        }

        //   comparing the password
        const correctPassword = await compare(
          credentials.password,
          userexists.password
        );
        if (!correctPassword || userexists.email !== credentials.email) {
          throw new Error('Invalid email address or password');
        }

        return userexists;
      },
    }),
  ],
});
