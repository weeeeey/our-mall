import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/server/client";
import bcrypt from "bcrypt";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { email, password } = req.body;
    const user = await client.user.findUnique({
        where: {
            email,
        },
        select: {
            name: true,
            email: true,
            image: true,
            password: true,
        },
    });
    if (!user) throw new Error("일치하는 아디 ㄴㄴ");
    if (bcrypt.compareSync(password, user.password)) {
        return res.json({ ok: true });
    } else {
        throw new Error("일치하는 비번 xx");
    }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

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
