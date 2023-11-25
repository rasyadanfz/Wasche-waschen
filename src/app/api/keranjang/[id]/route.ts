import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prismaSingleton/prismaSingleClient";
import { Orderline } from "@prisma/client";
export interface ClothesCartData {
    pakaianId?: string;
    kuantitas: number;
    total_harga: number;
    pakaianNama: string | undefined;
    subtract?: () => void;
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({
            error: "There is no user",
            status: 400,
        });
    }

    const Keranjang = await prisma.keranjang.findUnique({
        where: {
            userId: id,
        },
    });

    if (!Keranjang) {
        return NextResponse.json({
            error: "This user has no keranjang",
            status: 400,
        });
    }

    const orderline = await prisma.orderline.findMany({
        where: {
            keranjangId: Keranjang.id,
        },
    });

    const cartClothesData = await Promise.all(
        orderline.map(async (item: Orderline) => {
            const pakaian = await prisma.pakaian.findUnique({
                where: {
                    id: item.pakaianId,
                },
            });

            const temp: ClothesCartData = {
                pakaianId: item.pakaianId,
                kuantitas: item.kuantitas,
                total_harga: item.total_harga,
                pakaianNama: pakaian?.name,
            };
            return temp;
        })
    );

    return NextResponse.json({
        cartClothesData,
    });
}
