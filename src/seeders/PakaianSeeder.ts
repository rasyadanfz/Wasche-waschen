import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const namaPakaian = ["Kemeja", "Celana jeans", "Handuk", "Jaket", "Sprei - selimut", "Sepatu"];
    const hargaPakaian = [500, 1000, 4000, 8000, 14000, 10000];
    const unit = ["satuan", "satuan", "satuan", "satuan", "satuan", "satuan"];

    for (let i = 0; i < namaPakaian.length; i++) {
        await prisma.pakaian.create({
            data: {
                name: namaPakaian[i],
                price: hargaPakaian[i],
                unit: unit[i],
                existingPakaian: {
                    create: {
                        name: namaPakaian[i],
                        price: hargaPakaian[i],
                        unit: unit[i]
                    }
                }
            }
        })
    }

    // await prisma.pakaian.createMany({
    //     data: [
    //         {
    //             name: "Kemeja",
    //             price: 500,
    //             unit: "satuan",
    //             existingPakaian: {
    //                 create: {
    //                     name: "Kemeja",
    //                     price: 500,
    //                     unit: "satuan"
    //                 }
    //             }
    //         },
    //         {
    //             name: "Celana jeans",
    //             price: 1000,
    //             unit: "satuan"
    //         },
    //         {
    //             name: "Handuk",
    //             price: 4000,
    //             unit: "satuan"
    //         },
    //         {
    //             name: "Jaket",
    //             price: 8000,
    //             unit: "satuan"
    //         },
    //         {
    //             name: "Sprei - selimut",
    //             price: 14000,
    //             unit: "satuan"
    //         },
    //         {
    //             name: "Sepatu",
    //             price: 10000,
    //             unit: "satuan"
    //         },
    //     ],
    // })
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