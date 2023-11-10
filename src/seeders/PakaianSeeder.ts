import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.pakaian.createMany({
        data: [
            {
                name: "Kaos - kemeja",
                price: 6500,
                unit: "kg"
            },
            {
                name: "Celana jeans",
                price: 6500,
                unit: "kg"
            },
            {
                name: "Handuk",
                price: 4000,
                unit: "satuan"
            },
            {
                name: "Jaket",
                price: 8000,
                unit: "satuan"
            },
            {
                name: "Sprei - selimut",
                price: 14000,
                unit: "satuan"
            },
            {
                name: "Sepatu",
                price: 10000,
                unit: "satuan"
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