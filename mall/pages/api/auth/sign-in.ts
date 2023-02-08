import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/server/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        const accessToken = await new Promise((res, rej) => {
            jwt.sign(
                {
                    memberId: user.email,
                    memberName: user.name,
                },
                process.env.JWT_SECRETKEY,
                {
                    expiresIn: "5m", //토큰 유효시간
                },
                (err, token) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(token);
                    }
                }
            );
        });
        return res.json({ ok: true, accessToken }); // response에 성공 여부와 accessToken 담아서 보냄
    } else {
        throw new Error("일치하는 비번 xx");
    }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

/**
 * secure 쿠키 전달을 하려면 프론트(React)와 로그인 API를 제공할 백엔드(서버 API)는 
 * 같은 도메인을 공유해야한다. (예: 클라이언트: https://shop.abc.com, 서버 API: https://api.abc.com)
백엔드는 HTTP 응답 Set-Cookie 헤더에 refreshToken 값을 설정하고 accessToken 을 
JSON payload에 담아 보내줘야 한다.

https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0
}), */

/**
 * 1. sign-in.tsx 에서 id,pw 담아 sign-in.ts 로 Request
 * 2. db에 담긴 회원 정보 검토 후 아이디 비번 일치 확인
 * 3. 모두 일치 할 시 토큰 생성 후 해당 id의 유저 데이터와 토큰을 함께 Response 해줌
 *
 * react-cookie 사용
 */
