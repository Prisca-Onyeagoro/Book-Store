import Users from '@/Database/BookUserSchema';
import dbconn from '@/Database/dbconn';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, req) {
        dbconn().catch((error) => {
          throw new Error(`connection failed: ${error.message}`);
        });
        const userexists = Users.findOne({ email: credentials.email });
        if (!userexists) {
          throw new Error(
            'Click the signUp link above you dont have an account'
          );
        }
        const correctpassword = await compare(
          credentials.password,
          userexists.password
        );

        if (!correctpassword || userexists.email !== credentials.email) {
          throw new Error('Incorrect password');
        }
        return userexists;
      },
    }),
  ],
});
