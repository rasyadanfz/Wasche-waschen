import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

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

  const { password, newPassword } = await req.json();

  if (!password) {
    return NextResponse.json(
      { error: "Password tidak boleh kosong!" },
      { status: 400 }
    );
  }

  if (!newPassword) {
    return NextResponse.json(
      { error: "Password baru tidak boleh kosong!" },
      { status: 400 }
    );
  }

  if (!(await bcrypt.compare(password, user.hashedPassword))) {
    return NextResponse.json({ error: "Password salah!" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      hashedPassword: hashedPassword,
    },
  });

  if (!updatedUser) {
    return NextResponse.json(
      { error: "Gagal mengubah password!" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Berhasil mengubah password!" },
    { status: 200 }
  );
}
