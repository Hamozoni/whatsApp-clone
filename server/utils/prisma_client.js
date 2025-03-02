import { PrismaClient } from "@prisma/client";

let prisma_instance = null;

function get_prisma_instance () {
    if(!prisma_instance) {
        prisma_instance = new PrismaClient()
    };

    return prisma_instance
};

export default get_prisma_instance;