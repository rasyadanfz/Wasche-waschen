import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const detailTransaksi = await prisma.transaksi.findUnique({
      where: {
        id: id as string,
      }, include: {
        user: true,
      }
    });

    // return not found
    if (!detailTransaksi) {
      return NextResponse.next();
    }

    const formattedData = {
      id: detailTransaksi.id,
      nama: detailTransaksi.nama,
      total_harga: detailTransaksi.total_harga,
      status: detailTransaksi.status,
      tanggal: detailTransaksi.tanggal,
      userId: detailTransaksi.userId,
      nama_customer: detailTransaksi.user?.name,
    }

    return NextResponse.json(formattedData, { status: 200 });
  }

  try {
    const data = await prisma.transaksi.findMany({
      include: {
        user: true,
      },
    });

    const formattedData = data.map((item) => {
      return {
        id: item.id,
        nama: item.nama,
        total_harga: item.total_harga,
        status: item.status,
        tanggal: item.tanggal,
        userId: item.userId,
        nama_customer: item.user?.name,
      };
    });

    return NextResponse.json(formattedData, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error occured." }, { status: 403 });
  } finally {
    await prisma.$disconnect();
  }
}
