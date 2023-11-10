import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



async function main() {
  await prisma.transaksi.createMany({
    data: [
      {
        nama: "Transaksi 1",
        total_harga: 100000,
        status: "Not Confirmed",
        tanggal: '2021-10-10',
      },
      {
        nama: "Transaksi 2",
        total_harga: 200000,
        status: "On Progress",
        tanggal: '2021-10-11',
      },
      {
        nama: "Transaksi 3",
        total_harga: 300000,
        status: "Done",
        tanggal: '2021-10-12',
      },
      {
        nama: "Transaksi 4",
        total_harga: 400000,
        status: "Done",
        tanggal: '2021-10-13',
      },
      {
        nama: "Transaksi 5",
        total_harga: 500000,
        status : "Done",
        tanggal: '2021-10-14',
      },
      {
        nama: "Transaksi 6",
        total_harga: 600000,
        status : "Done",
        tanggal: '2021-10-15',
      },
      {
        nama: "Transaksi 7",
        total_harga: 800000,
        status : "Done",
        tanggal: '2021-10-17',
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