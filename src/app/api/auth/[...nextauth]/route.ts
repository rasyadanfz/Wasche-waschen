import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "johnsmith@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, req) => {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                if (!email || !password) {
                    throw new Error("Email/Password cannot be empty");
                }

                // Check user in DB
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (!user) {
                    throw new Error("No user found");
                }

                if (!(await bcrypt.compare(password, user.hashedPassword))) {
                    throw new Error("Wrong password");
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV == "development",
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user && user.id) {
                token.id = user.id;
                const userData = await prisma.user.findUnique({
                    where: {
                        id: user.id,
                    },
                    select: {
                        role: true,
                    },
                });

                if (userData) {
                    token.role = userData.role;
                }
            }
            return token;
        },
        session: async ({ session, token }) => {
            const userData = await prisma.user.findUnique({
                where: {
                    id: token.id as string,
                },
                select: {
                    email: true,
                    name: true,
                    no_telp: true,
                    role: true,
                },
            });

            if (userData) {
                session.user = userData;
            }

            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
