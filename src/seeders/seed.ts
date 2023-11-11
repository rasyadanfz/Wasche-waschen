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

  // upsert user
  const user = await prisma.user.upsert({
    where: {
      email: "test12345@gmail.com",
    },
    update: {
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
              ]
            },
          },
        },
      },
      Transaksi: {
        createMany: {
          data: [
            {
              nama: "Sample Transaction",
              total_harga: totalHarga,
              status: "Done",
              tanggal: "2023-11-11", // Replace with actual date
            },
            {
              nama: "Sample Transaction 2",
              total_harga: totalHarga,
              status: "On Progress",
              tanggal: "2023-11-11", // Replace with actual date
            },
            {
              nama: "Sample Transaction 3",
              total_harga: totalHarga2,
              status: "Not Confirmed",
              tanggal: "2023-11-11", // Replace with actual date
            }
          ]
        },
      },
    },
    create: {
      email: "test12345@gmail.com",
      name: "John Doe",
      no_telp: "123456789",
      hashedPassword: "hashed_password", // Replace with actual hashed password
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
              ]
            }
          },
        },
      },
      Transaksi: {
        createMany: {
          data: [
            {
              nama: "Sample Transaction",
              total_harga: totalHarga,
              status: "Done",
              tanggal: "2023-11-11", // Replace with actual date
            },
            {
              nama: "Sample Transaction 2",
              total_harga: totalHarga,
              status: "On Progress",
              tanggal: "2023-11-11", // Replace with actual date
            },
            {
              nama: "Sample Transaction 3",
              total_harga: totalHarga2,
              status: "Not Confirmed",
              tanggal: "2023-11-11", // Replace with actual date
            }
          ]
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