import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from './supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data: user, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', credentials.email)
            .single();

        if (error || !user) return null;

        // Validating password (plain text for now as per previous implementation logic)
        // In production, compare hashed password here
        if (user.password === credentials.password) {
          return { id: user.id, name: user.name, email: user.email };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
        if (session.user && token.sub) {
            session.user.name = token.name;
            session.user.email = token.email;
             // session.user.id = token.sub; // invalid types unless extended
        }
      return session;
    },
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
        }
      return token;
    }
  }
};
