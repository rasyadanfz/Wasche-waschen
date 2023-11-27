import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";

const prisma = new PrismaClient();

const resetPakaian = async () => {
    const deleteExistingPakaian = await prisma.existingPakaian.deleteMany();
    const deletePakaian = await prisma.pakaian.deleteMany();

    const namaPakaian = [
        "Kemeja",
        "Celana jeans",
        "Handuk",
        "Jaket",
        "Sprei - selimut",
        "Sepatu",
    ];
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
                        unit: unit[i],
                    },
                },
            },
        });
    }
    console.log("Done resetting pakaian & existing pakaian!");
};

const deleteOrderlinesandTransaction = async () => {
    await prisma.orderline.deleteMany();
    await prisma.transaksi.deleteMany();
    const user = await prisma.user.findUnique({
        where: {
            email: "test12345@gmail.com",
        },
    });
    try {
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
    } catch (error) {
        console.log(error);
    } finally {
        console.log("Orderlines & Transactions deleted!");
    }
};

const seedOrderlineandTransactions = async () => {
    const pakaianArray = await prisma.pakaian.findMany();
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
            await prisma.keranjang.delete({
                where: {
                    userId: user.id,
                },
            });
            await prisma.user.delete({
                where: {
                    email: email,
                },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const randomClothes =
            pakaianArray[Math.floor(Math.random() * pakaianArray.length)];
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
                                kuantitas: 3,
                                total_harga: randomClothes.price,
                                noted: "Sample Note",
                                pakaianId: randomClothes.id,
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

const main = async () => {
    await deleteOrderlinesandTransaction();
    await resetPakaian();
    await seedOrderlineandTransactions();
};

main();
