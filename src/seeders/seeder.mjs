import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";

const prisma = new PrismaClient();

const main = async () => {
    const isUserExist = async (email) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    };

    const createUser = async (name, email, password, no_telp) => {
        const user = await isUserExist(email);
        if (user) {
            await prisma.user.delete({
                where: {
                    email: email,
                },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                hashedPassword: hashedPassword,
                no_telp: no_telp,
                keranjang: {
                    create: {
                        orderlines: {
                            create: {
                                kuantitas: 2,
                                total_harga: 8000,
                                noted: "Sample Note",
                                pakaianId: "654de5dc9d45a43705756bd1",
                            },
                        },
                    },
                },
            },
        });

        return createdUser;
    };

    let currUser = await createUser(
        "test12345",
        "test12345@gmail.com",
        "fuckyou",
        "081234567890"
    );

    const pakaian1 = await prisma.pakaian.findFirst({
        where: {
            name: "Kaos - kemeja",
        },
    });
    const pakaian2 = await prisma.pakaian.findFirst({
        where: {
            name: "Celana jeans",
        },
    });
    const pakaian3 = await prisma.pakaian.findFirst({
        where: {
            name: "Handuk",
        },
    });
    const pakaian4 = await prisma.pakaian.findFirst({
        where: {
            name: "Jaket",
        },
    });
    const pakaian5 = await prisma.pakaian.findFirst({
        where: {
            name: "Sepatu",
        },
    });

    const pakaianArray = [pakaian1, pakaian2, pakaian3, pakaian4, pakaian5];

    // Seed Transaction Data
    let transactionList = [];
    for (let i = 0; i < 150; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (150 - i));
        const finalDate = date.toISOString().split("T")[0];
        const randomPakaian =
            pakaianArray[Math.floor(Math.random() * pakaianArray.length)];
        const randomQuantity = Math.floor(Math.random() * 10) + 1;
        if (randomPakaian) {
            const createTransaction = await prisma.transaksi.create({
                data: {
                    nama: "Transaksi " + i,
                    total_harga: randomPakaian.price * randomQuantity,
                    status: "Done",
                    tanggal: finalDate,
                    userId: currUser.id,
                    orderlines: {
                        create: {
                            kuantitas: randomQuantity,
                            total_harga: randomPakaian.price * randomQuantity,
                            noted: "Sample Note",
                            pakaian: {
                                connect: { id: randomPakaian.id },
                            },
                        },
                    },
                },
            });
            if (createTransaction) {
                transactionList.push(createTransaction);
                console.log(`Transaction ${i} completed!`);
            }
        }
    }

    currUser = await createUser(
        "user234",
        "user234@gmail.com",
        "user234",
        "081239231891"
    );
    for (let i = 150; i < 181; i++) {
        const date = new Date();
        date.setMinutes(date.getMinutes() - (250 - i));
        const finalDate = date.toISOString().split("T")[0];
        const randomPakaian =
            pakaianArray[Math.floor(Math.random() * pakaianArray.length)];
        const randomQuantity = Math.floor(Math.random() * 10) + 1;
        if (randomPakaian) {
            const createTransaction = await prisma.transaksi.create({
                data: {
                    nama: "Transaksi " + i,
                    total_harga: randomPakaian.price * randomQuantity,
                    status: "On Progress",
                    tanggal: finalDate,
                    userId: currUser.id,
                    orderlines: {
                        create: {
                            kuantitas: randomQuantity,
                            total_harga: randomPakaian.price * randomQuantity,
                            noted: "Sample Note " + i,
                            pakaian: {
                                connect: { id: randomPakaian.id },
                            },
                        },
                    },
                },
            });
            if (createTransaction) {
                transactionList.push(createTransaction);
                console.log(`Transaction ${i} completed!`);
            }
        }
    }
    console.log(
        "Successfully created " + transactionList.length + " transactions!"
    );
};

main();
