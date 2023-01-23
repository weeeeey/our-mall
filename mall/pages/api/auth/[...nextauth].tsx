import client from "@/lib/server/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import KakaoProvider from "next-auth/providers/kakao";
import Adapters from "next-auth/adapters";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "email-password-credential",
            name: "Credentials", //NextAuth에서 만들어주는 Form 태그의 로그인 버튼에 노출될 텍스트
            type: "credentials",

            credentials: {
                email: {
                    label: "email",
                    type: "email",
                },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials)
                    throw new Error("잘못된 입력값으로 인한 오류 발생");

                const { email, password } = credentials;
                const exUser = await client.user.findUnique({
                    where: { email },
                });
                if (!exUser)
                    throw new Error("아이디나 비밀번호가 불일치합니다");

                const match = await bcrypt.compare(password, exUser.password);
                if (!match) throw new Error("아이디나 비밀번호가 불일치합니다");

                return exUser;
            },
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
        }),
    ],
    adapter: Adapters.Prisma.Adaptter({ client }),
    callbacks: {
        /** 
        어떤 데이터를 넘겨주고 싶으면 jwt 토큰에 데이터를 유지하고 session에서 처리해주면 된다
        1. providers 내부의 async authorize 에 인증을 실행
        (로그인 인증 성공시)
        2. callbacks의 jwt 함수가 실행
        3. callbacks의 session 함수가 실행
        */
        async jwt({ token }) {
            return token;
        },
        async session({ session }) {
            const exUser = await client.user.findUnique({
                where: {
                    email: session.user?.email!,
                },
                select: {
                    email: true,
                    name: true,
                },
            });
            session.user = exUser!;
            return session;
        },
    },
    // pages: {
    //     signIn: "/sign-in",
    //     signOut: "/",
    // },
});
