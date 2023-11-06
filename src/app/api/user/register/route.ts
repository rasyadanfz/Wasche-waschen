import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { email, nama, no_telp, password } = await req.json();
    if (!email || !nama || !no_telp || !password) {
        return new NextResponse(
            "Email, nama, nomor telepon, atau password tidak boleh kosong!",
            { status: 400 }
        );
    }

    const isUserAlreadyExist = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (isUserAlreadyExist) {
        return new NextResponse("Email sudah terdaftar", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: email,
            nama: nama,
            no_telp: no_telp,
            hashedPassword: hashedPassword,
        },
    });

    if (!newUser) {
        return new NextResponse("Gagal membuat akun", { status: 500 });
    }

    return NextResponse.json(newUser);
}
