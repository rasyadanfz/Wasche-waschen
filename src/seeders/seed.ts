import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Fetch a Pakaian record to get its ID
  const pakaian = await prisma.pakaian.findFirst({
    select: {
      id: true,
    },
  });

  if (!pakaian) {
    console.error("No Pakaian found.");
    return;
  }

  const pakaianId = pakaian.id;

  const user1 = await prisma.user.upsert({
    where: { email: "test12345@gmail.com" },
    update: {
      name: "Ahmad",
      keranjang: {
        create: {
          transaksi: {
            create: {
              nama: "Transaksi 0",
              tanggal: "2021-08-01",
              status: "Not Confirmed",
            },
          },
          orderline: {
            createMany: {
              data: [
                {
                  pakaianId: pakaianId,
                  kuantitas: 3,
                  noted: "test",
                },
              ],
            },
          },
        },
      },
    },
    create: {
      email: "test12345@gmail.com",
      name: "test12345",
      hashedPassword: "test12345",
      role: "Customer",
      no_telp: "08123456789",
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
