import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();



export async function PUT(req: NextRequest) {
    const { id } = req.query;
    const { email, name, no_telp, password } = await req.json();
    if (!email) {
        return NextResponse.json(
            { error: "Email tidak boleh kosong!" },
            { status: 400 }
        );
    } else if (email) {
        const emailString = email as string;
        if (!emailString.includes("@")) {
            return NextResponse.json(
                { error: "Email tidak valid!" },
                { status: 400 }
            );
        }
    }

    if (!name) {
        return NextResponse.json(
            { error: "Nama tidak boleh kosong!" },
            { status: 400 }
        );
    } else if (!no_telp) {
        return NextResponse.json(
            { error: "Nomor telepon tidak boleh kosong!" },
            { status: 400 }
        );
    } else if (!password) {
        return NextResponse.json(
            { error: "Password tidak boleh kosong!" },
            { status: 400 }
        );
    }

    const isUserAlreadyExist = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (isUserAlreadyExist) {
        return NextResponse.json(
            { error: "Email sudah terdaftar!" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.update({
        where: {
            id: Number(id),
        },
        data: {
            email: email,
            name: name,
            no_telp: no_telp,
            hashedPassword: hashedPassword,
        },
    });

    if (!newUser) {
        return NextResponse.json(
            { error: "Gagal mengubah data!" },
            { status: 400 }
        );
    }

    return NextResponse.next();
}