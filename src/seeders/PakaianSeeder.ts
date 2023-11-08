import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.pakaian.createMany({
        data: [
            {
                name: "Pakaian 1",
                price: 4000,
            },
            {
                name: "Pakaian 2",
                price: 6500,
            },
            {
                name: "Pakaian 3",
                price: 6500,
            },
            {
                name: "Pakaian 4",
                price: 10000,
            },
            {
                name: "Pakaian 5",
                price: 14000,
            },
        ],
    })
}

main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })