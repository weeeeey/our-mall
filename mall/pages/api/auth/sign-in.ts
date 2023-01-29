import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/server/client";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const information = req.body;

    console.log(information);
    if (!information) return res.status(400).json({ ok: false });
}

export default withHandler({ methods: ["GET"], handler, isPrivate: false });

/**CredentialsProvider({
    id: "email-password-credential",
    name: "Credentials", //NextAuth에서 만들어주는 Form 태그의 로그인 버튼에 노출될 텍스트
    type: "credentials",
    //
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
        //
        const { email, password } = credentials;
        const exUser = await client.user.findUnique({
            where: { email },
        });
        if (!exUser)
            throw new Error("아이디나 비밀번호가 불일치합니다");
        //
        const match = await bcrypt.compare(password, exUser.password);
        if (!match) throw new Error("아이디나 비밀번호가 불일치합니다");
        //
        return exUser;
    },
}), */

/**
 * Callback은 비동기 함수. 액션이 수행됐을때 발생하는 것들을 내가 컨트롤 할 수 있는
콜백은 JWT와 관련됐다 (외부 db또는 API를 통합하는 또는 db없이 컨트롤을 접근할 수 있는

JWT를 사용할때, 브라우저에 user Id또는 Access Token같은 데이터들을 패스하고 싶다면, JWT콜백이 호출 됐을때 토큰에 있는 데이터를 지속할 수 있게 한다. 그럼 session 콜백에서 브라우저를 통해 데이터를 pass할 수 있다.
...
특히 아래 콜백에 대한 핸들러를 특정화 할 수 있음.
    callbacks: {
        
        //유저가 로그인 되길 허락될지 말지에 대해 컨트롤 하고 싶다면 signIn() 콜백을 사용해라
        // Email Provider 사용할때, 유저는 인증 요청을 만들 수 있음
        // Credentials Provider를 사용할때, user객체는 response가 있다 (authorize 콜백으로부터 리턴한)
        // 그리고 profile 객체는 HTTP POST 제출에 대한 body 이다.
    async signIn({ user, account, profile, email, credentials }) {
        return true
    },

    async redirect({ url, baseUrl }) {
        return baseUrl
    },
    async session({ session, user, token }) {
        return session
    },

    // JWT가 만들어지거나(로그인할때) 업데이트될때(session이 클라이언트에게 접근할떄) 이 콜백이 호출됨.
    // 리턴 값은 암호화되고 쿠키에 저장됨
    
    async jwt({ token, user, account, profile, isNewUser }) {
        return token
    }
...
}




 */
