import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prismaSingleton/prismaSingleClient";

// Get all transactions done by user with id
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const transaksi = await prisma.transaksi.findMany({
        where: {
            userId: id,
        },
    });

    return NextResponse.json(
        { messagge: "Success", transaksi },
        { status: 200 }
    );
}
