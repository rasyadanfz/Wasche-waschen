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
      },
    });

    // return not found
    if (!detailTransaksi) {
      return NextResponse.next();
    }
  }

  const detailTransaksi = await prisma.transaksi.findMany();
  return NextResponse.json(detailTransaksi);
}
