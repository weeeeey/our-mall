import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/server/client";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const information = req.body;
    if (!information) return res.status(400).json({ ok: false });

    // 동일 이메일로 가입한 흔적 찾기
    const foundUser = await client.user.findUnique({
        where: {
            email: information.email,
        },
    });
    if (foundUser) {
        return res.json({
            ok: false,
        });
    }
    const user = await client.user.create({
        data: {
            name: information.name,
            email: information.email,
            password: information.password,
        },
    });
    console.log(user);
    return res.json({
        ok: true,
        user,
    });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
