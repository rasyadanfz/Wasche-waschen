import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// mengubah data user berdasarkan id
export async function PUT(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID tidak boleh kosong!" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User tidak ditemukan!" },
      { status: 400 }
    );
  }

  const data = await req.json();

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      email: data.email,
      no_telp: data.no_telp,
    },
  });

  if (!updatedUser) {
    return NextResponse.json(
      { error: "Gagal mengubah data user!" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Berhasil mengubah data user!" }, { status: 200 });

}