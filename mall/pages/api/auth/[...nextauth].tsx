import client from "@/lib/server/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_PASSWORD,
            authorization: {
                params: {
                    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
                },
            },
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/sign-in",
        signOut: "/",
    },
    adapter: PrismaAdapter(client),
    secret: process.env.NEXTAUTH_SECRET,
    // callbacks: {
    // async jwt({ token, account }) {
    // console.log(token);
    // console.log(account);
    //
    // return token;
    // },
    // },
});
