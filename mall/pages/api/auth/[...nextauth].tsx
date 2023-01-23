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
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "이메일",
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "비밀번호",
                },
            },
            async authorize(credentials) {
                if (!credentials)
                    throw new Error("잘못된 입력값으로 인한 오류 발생");

                const { email, password } = credentials;
                const exUser = await client.user.findUnique({
                    where: { email },
                });
                if (!exUser) throw new Error("존자해자 않는 아이디입니다");

                const result = await bcrypt.compare(password, exUser.password);
                if (!result) throw new Error("비밀번호가 불일치합니다");
                console.log(exUser)
                return exUser;
            },
        }),
    ],
    callbacks: {
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
});
