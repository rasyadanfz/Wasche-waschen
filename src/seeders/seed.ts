import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // take pakaian from pakaian table
  const pakaian = await prisma.pakaian.findFirst({
    where: {
      name: "Sepatu",
    },
  });

  const pakaian2 = await prisma.pakaian.findFirst({
    where: {
      name: "Jaket",
    },
  });

  // take userId from user table
  const idPakaian = pakaian?.id || "";
  const idPakaian2 = pakaian2?.id || "";

  const totalHarga = pakaian ? pakaian.price * 3 : 0;
  const totalHarga2 = pakaian2 ? pakaian2.price * 3 : 0;

  const password = "fuckyou";
  const hashedPassword = await bcrypt.hash(password, 10);

  const transactions= []

  for (let i = 4; i <= 100; i++) {
    let newTransaction = {
      nama: `Sample Transaction ${i}`,
      total_harga: totalHarga + i, // Adjust the total_harga value as needed
      status: i % 2 === 0 ? "Done" : "On Progress", // Alternate between "Done" and "On Progress"
      tanggal: "2023-11-11",
    };
  
    transactions.push(newTransaction);
  }

  // upsert user
  const user = await prisma.user.upsert({
    where: {
      email: "customer@gmail.com",
    },
    update: {
      Transaksi: {
        createMany: {
          data: transactions,
        },
      },
    },
    create: {
      email: "test12345@gmail.com",
      name: "John Doe",
      no_telp: "123456789",
      hashedPassword: hashedPassword, // Replace with actual hashed password
      keranjang: {
        create: {
          orderlines: {
            createMany: {
              data: [
                {
                  kuantitas: 3,
                  total_harga: totalHarga,
                  noted: "Sample Note",
                  pakaianId: idPakaian,
                },
                {
                  kuantitas: 3,
                  total_harga: totalHarga2,
                  noted: "Sample Note",
                  pakaianId: idPakaian2,
                },
              ],
            },
          },
        },
      },
      Transaksi: {
        createMany: {
          data: transactions,
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log("Seeding done!");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
