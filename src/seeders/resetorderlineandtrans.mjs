import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.orderline.deleteMany();
    await prisma.transaksi.deleteMany();
    await prisma.keranjang.deleteMany();
    await prisma.user.delete({
        where: {
            email: "test12345@gmail.com",
        },
    });
}

main();
