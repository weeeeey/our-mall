import client from "@/lib/server/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
    providers: [
        // KakaoProvider({
        //     clientId: process.env.KAKAO_CLIENT_ID,
        //     clientSecret: process.env.KAKAO_CLIENT_SECRET,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_PASSWORD,
            authorization: {
                params: {
                    redirect_uri:
                        "http://localhost:3000/api/auth/callback/google",
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
        signOut: "/sign-in",
    },
    // adapter: PrismaAdapter(client),
    secret: process.env.NEXTAUTH_SECRET,
    // callbacks: {
    //     // OAuth 처리
    //     async jwt({ token, account }) {
    //         console.log("===============");
    //         console.log(token);
    //         console.log("===============");

    //         if (!account) return token;
    //         if (account.provider === "kakao") {
    //             const exUser = await client.account.findFirst({
    //                 where: {
    //                     provider: "kakao",
    //                     access_token: account.access_token,
    //                 },
    //             });
    //             /**
    //              * -account-
    //             provider: 'kakao',
    //             type: 'oauth',
    //             providerAccountId: '2634340883',
    //             access_token: 'csiVXqQ0VM2P_CcxHLHgVXWHYXg0HImNx9c_XXC0Cj11GQAAAYXoNbAC',
    //             token_type: 'bearer',
    //             refresh_token: 'IZno7zuQ9Ip2BdkfI7yCUMR1iPS7T3yFZWx-opvICj11GQAAAYXoNbAB',
    //             expires_at: 1674659709,
    //             scope: 'profile_nickname',
    //             refresh_token_expires_in: 5183999

    //             -token-
    //             [인증 성공 전]
    //             name: '위영진',
    //             sub: '2634340883',
    //             iat: 1674638226,
    //             exp: 1677230226,
    //             jti: '65c696be-966b-4ea3-844e-8eee47ca30e1'

    //             [인증 성공 후]
    //             name: '위영진',
    //             email: undefined,
    //             picture: undefined,
    //             sub: '2634340883'
    //             */

    //             // if (!exUser) {
    //             //미등록 유저라면 회원가입
    //             // const {
    //             //     provider,
    //             //     type,
    //             //     providerAccountId,
    //             //     access_token,
    //             //     token_type,
    //             //     refresh_token,
    //             //     expires_at,
    //             //     scope,
    //             // } = account;
    //             // await client.account.create({
    //             //     data: {
    //             //         provider,
    //             //         type,
    //             //         providerAccountId,
    //             //         access_token,
    //             //         token_type,
    //             //         refresh_token,
    //             //         expires_at,
    //             //         scope,
    //             //         user:{
    //             //             connectOrCreate:{
    //             //                 where:{
    //             //                     id:
    //             //                 }
    //             //             }
    //             //         }
    //             //     },

    //             // });
    //         }
    //         return token;
    //     },

    //     // 세션에 로그인한 유저 데이터 입력
    //     async session({ session }) {
    //         const exUser = await client.user.findFirst({
    //             where: {
    //                 email: session.user?.email,
    //             },
    //             select: {
    //                 email: true,
    //                 name: true,
    //                 phone: true,
    //                 image: true,
    //             },
    //         });
    //         session.user = exUser!;
    //         return session;
    //     },
    // },
});

/** 
        어떤 데이터를 넘겨주고 싶으면 jwt 토큰에 데이터를 유지하고 session에서 처리해주면 된다
        1. providers 내부의 async authorize 에 인증을 실행
        (로그인 인증 성공시)
        2. callbacks의 jwt 함수가 실행
        3. callbacks의 session 함수가 실행
        Callbacks are asynchronous functions you can use to control what happens when an action is performed.
        */
