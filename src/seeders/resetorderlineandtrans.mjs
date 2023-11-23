import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.orderline.deleteMany();
    await prisma.transaksi.deleteMany();
    const user = await prisma.user.findUnique({
        where: {
            email: "test12345@gmail.com",
        },
    });
    await prisma.keranjang.delete({
        where: {
            userId: user.id,
        },
    });
    await prisma.user.delete({
        where: {
            email: "test12345@gmail.com",
        },
    });
}

main();
