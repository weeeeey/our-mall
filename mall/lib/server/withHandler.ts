import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
    methods: method[];
    handler: (req: NextApiRequest, res: NextApiResponse) => void;
    isPrivate?: boolean; //접근하는 API가 private? public
}

const withHandler = ({ methods, handler, isPrivate = true }: ConfigType) => {
    return async function (
        req: NextApiRequest,
        res: NextApiResponse
    ): Promise<any> {
        if (req.method && !methods.includes(req.method as any)) {
            return res.status(405).end();
        }
        // if(isPrivate && !req.session.user)
        try {
            await handler(req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
};

export default withHandler;
