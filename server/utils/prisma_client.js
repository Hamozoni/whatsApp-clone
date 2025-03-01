const { PrismaClient } = require("@prisma/client");

let prisma_instance = null;

function git_prisma_instance () {
    if(!prisma_instance) {
        prisma_instance = new PrismaClient()
    };

    return prisma_instance
};

export default git_prisma_instance;