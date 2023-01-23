import client from "@/lib/server/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextApiRequest } from "next/types";

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: {
//                     label: "email",
//                     type: "email",
//                     placeholder: "이메일",
//                 },
//                 password: {
//                     label: "password",
//                     type: "password",
//                     placeholder: "비밀번호",
//                 },
//             },
//             async authorize(credentials, req) {
//                 // Add logic here to look up the user from the credentials supplied
//                 const user = await client.user.findUnique({
//                     where: {
//                         email: credentials?.email,
//                     },
//                 });
//                 if (
//                     credentials?.email == user?.email &&
//                     credentials?.password == user?.password
//                 ) {
//                     return user;
//                 } else {
//                     return false;
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         session({ session, token, user }) {
//             return session; // The return type will match the one returned in `useSession()`
//         },
//     },
// });

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

                console.log(exUser);
                return exUser;
            },
        }),
    ],
    callbacks: {
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
    pages: {
        signIn: "/sign-in",
    },
});
