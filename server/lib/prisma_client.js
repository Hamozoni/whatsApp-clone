import { PrismaClient } from "@prisma/client";

const global_for_prisma = global;

const prisma = global_for_prisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global_for_prisma.prisma = prisma
};

export default prisma;
