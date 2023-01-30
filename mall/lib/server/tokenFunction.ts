import React from "react";

const dotenv = require("dotenv");
dotenv.config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
    //access token 생성
    getAccessToken: (payload) => {
        return sign(payload, process.env.ACCESS_SECRET, { expiresIn: "30s" });
    },
    //refresh token 생성
    getRefreshToken: (payload) => {
        return sign(payload, process.env.REFRESH_SECRET, { expiresIn: "1h" });
    },
    //access token 응답객체에 실어서 보내기
    sendAccessToken: (accessToken, res) => {
        res.status(200).json({ data: { accessToken }, message: "ok" });
    },
    //refresh token 쿠키에 담기
    sendRefreshToken: (refreshToken, res) => {
        res.cookie("refreshToken", refreshToken, {
            domain: "localhost",
            path: "/",
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
    },
    //refresh token으로 요청이 왔을 때, access token, userInfo 다시 보내기
    resendAccessToken: (userInfo, accessToken, res) => {
        res.status(200).json({
            data: { accessToken, userInfo },
            message: "ok",
        });
    },
    //headers.authorization 있는지 확인하고, 있다면 token을 해독한 결과를 리턴
    isAutherization: (req) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return null;
        }
        const token = authorization.split(" ")[1];
        try {
            return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    },
    //유효한 refresh token 인지 해독
    checkRefreshToken: (refreshToken) => {
        try {
            return verify(refreshToken, process.env.REFRESH_SECRET);
        } catch (err) {
            return null;
        }
    },
};
