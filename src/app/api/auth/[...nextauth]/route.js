import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username },
                });

                if (
                    user &&
                    (await bcrypt.compare(credentials.password, user.password))
                ) {
                    return user;
                } else {
                    throw new Error("Invalid credentials");
                    return {error:"Invalid credentials"}
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.picture = user.picture;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token, user }) {

            if (token) {
                session.user = {
                    id: token.id,
                    picture: token.picture,
                    username: token.username,
                };
            }
            
            return session;
        },
    },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
