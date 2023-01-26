import client from "@/lib/server/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

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
        // CredentialsProvider({
        //     id: "email-password-credential",
        //     name: "Credentials", //NextAuth에서 만들어주는 Form 태그의 로그인 버튼에 노출될 텍스트
        //     type: "credentials",

        //     credentials: {
        //         email: {
        //             label: "email",
        //             type: "email",
        //         },
        //         password: {
        //             label: "password",
        //             type: "password",
        //         },
        //     },
        //     async authorize(credentials) {
        //         if (!credentials)
        //             throw new Error("잘못된 입력값으로 인한 오류 발생");

        //         const { email, password } = credentials;
        //         const exUser = await client.user.findUnique({
        //             where: { email },
        //         });
        //         if (!exUser)
        //             throw new Error("아이디나 비밀번호가 불일치합니다");

        //         const match = await bcrypt.compare(password, exUser.password);
        //         if (!match) throw new Error("아이디나 비밀번호가 불일치합니다");

        //         return exUser;
        //     },
        // }),
    ],
    pages: {
        // signIn: "/sign-in",
        // signOut: "/sign-in",
    },
    // adapter: PrismaAdapter(client),
    secret: process.env.NEXTAUTH_SECRET,

    /** 
    어떤 데이터를 넘겨주고 싶으면 jwt 토큰에 데이터를 유지하고 session에서 처리해주면 된다
    1. providers 내부의 async authorize 에 인증을 실행
    (로그인 인증 성공시)
    2. callbacks의 jwt 함수가 실행
    3. callbacks의 session 함수가 실행
    Callbacks are asynchronous functions you can use to control what happens when an action is performed.
     */
    callbacks: {
        async jwt({ token, account }) {
            if (!account) return token;
            // OAuth로 로그인 했는데 이미 전적 있으면 그냥 토큰 리턴.
            // 없으면 User에 이메일 네임
            const exUser = await client.user.findFirst({
                where: {
                    email: token.email,
                },
            });
            if (exUser) return token;
            const user = await client.user.create({
                data: {
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                },
            });
            const exAcount = await client.account.create({
                data: {
                    provider: account.provider,
                    type: account.type,
                    providerAccountId: account.providerAccountId,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    scope: account.scope,
                    token_type: account.token_type,
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });
            return token;
        },
        // 세션에 로그인한 유저 데이터 입력
        async session({ session }) {
            const exUser = await client.user.findFirst({
                where: {
                    email: session.user?.email,
                },
                select: {
                    email: true,
                    name: true,
                    phone: true,
                    image: true,
                },
            });
            session.user = exUser!;
            return session;
        },
    },
});
