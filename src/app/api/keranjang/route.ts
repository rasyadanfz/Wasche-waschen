import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prismaSingleton/prismaSingleClient";

// Update Cart Data for User with userId
export async function PUT(req: NextRequest) {
    const { ClothesCartData, userId } = await req.json();

    // find keranjang first
    const keranjang = await prisma.keranjang.findUnique({
        where: {
            userId: userId,
        },
    });

    for (let i = 0; i < ClothesCartData.length; i++) {
        // update each pakaian

        if (ClothesCartData[i].kuantitas == 0) {
            // delete
            const delPakaian = await prisma.orderline.deleteMany({
                where: {
                    pakaianId: ClothesCartData[i].pakaianId,
                },
            });
        } else {
            const updatePakaian = await prisma.orderline.updateMany({
                where: {
                    pakaianId: ClothesCartData[i].pakaianId,
                    keranjangId: keranjang?.id,
                },
                data: {
                    kuantitas: ClothesCartData[i].kuantitas,
                    total_harga: ClothesCartData[i].total_harga,
                },
            });
        }
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
}
