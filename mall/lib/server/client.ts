import { PrismaClient } from "@prisma/client";

declare global {
    var client: PrismaClient | undefined;
}
const client = global.client || new PrismaClient();
if (process.env.NODE_ENV === "development") global.client = client;

export default client;

// Prisma(DB) 는 서버에서 운용되고 프론트엔드에서 사용되면 안됨
// 그래서 컴포턴트에서 바로 import 할 시 오류 뜸
