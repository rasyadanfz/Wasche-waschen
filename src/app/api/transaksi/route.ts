import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const data = await prisma.transaksi.findMany();
        return NextResponse.json(data, { status: 200 })
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error occured." }, { status: 403 })
    }
    finally {
        await prisma.$disconnect();
    }
}
