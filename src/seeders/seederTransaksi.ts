import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaksi.create({
    data: [
      {
        userId : 1,
        total_harga: 100000,
        status: "Not Confirmed",
        tanggal: new Date('2021-10-10'),
      },
      {
        userId : 1,
        total_harga: 200000,
        status: "On Progress",
        tanggal: new Date('2021-10-11'),
      },
      {
        userId : 1,
        total_harga: 300000,
        status: "Done",
        tanggal: new Date('2021-10-12'),
      },
      {
        userId : 1,
        total_harga: 400000,
        status: "Done",
        tanggal: new Date('2021-10-13'),
      },
      {
        userId : 1,
        total_harga: 500000,
        status : "Done",
        tanggal: new Date('2021-10-14'),
      },
      {
        userId : 1,
        total_harga: 600000,
        status : "Done",
        tanggal: new Date('2021-10-15'),
      },
      {
        userId : 1,
        total_harga: 800000,
        status : "Done",
        tanggal: new Date('2021-10-17'),
      }
    ]
  })
}

main()
  .then(async () => {
    console.log("Seeding successful");
  })
  .catch(async (e) => {
    console.error("Seeding failed", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });