import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../../prismaSingleton/prismaSingleClient";

export async function PATCH(req: NextRequest) {
    const { ArrayOfOrderline } = await req.json();

    if (!ArrayOfOrderline) {
        return NextResponse.json(
            { message: "There is no array of orderline" },
            { status: 200 }
        );
    }

    // delete each element
    for (let i = 0; i < ArrayOfOrderline.length; i++) {
        const oldOrderline = ArrayOfOrderline[i];

        if (oldOrderline.kuantitas === 0) {
            // delete the orderline
            const deleteOrderline = await prisma.orderline.delete({
                where: {
                    id: oldOrderline.id,
                },
            });
        } else {
            // just edit the orderline
            const editOrderline = await prisma.orderline.update({
                where: {
                    id: oldOrderline.id,
                },
                data: {
                    kuantitas: oldOrderline.kuantitas,
                },
            });
        }
    }

    return NextResponse.json(
        { message: "Finished updating the orderline" },
        { status: 200 }
    );
}

export async function POST(req: NextRequest) {
    const {
        userId,
        pakaianInCart,
    }: { userId: string; pakaianInCart: { [pakaianId: string]: number }[] } =
        await req.json();
    if (!userId) {
        return NextResponse.json({ error: "No user" }, { status: 400 });
    }

    if (!pakaianInCart) {
        return NextResponse.json(
            { error: "No Array of PakaianCnt" },
            { status: 400 }
        );
    }

    // Get user's keranjang
    const keranjang = await prisma.keranjang.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!keranjang) {
        return NextResponse.json({ error: "No Keranjang" }, { status: 400 });
    }
    for (let i = 0; i < pakaianInCart.length; i++) {
        if (pakaianInCart[i].count != 0) {
            // check whether there's already an orderline of that pakaian or not
            const existingPakaianId = Object.keys(pakaianInCart[i])[0];
            const qty = pakaianInCart[i][existingPakaianId];
            const existingpakaian = await prisma.existingPakaian.findUnique({
                where: {
                    id: existingPakaianId,
                },
                select: {
                    pakaianId: true,
                },
            });
            const pakaian = await prisma.pakaian.findUnique({
                where: {
                    id: existingpakaian!.pakaianId,
                },
            });

            const tempOrderline = await prisma.orderline.findMany({
                where: {
                    keranjangId: keranjang.id,
                    pakaianId: pakaian!.id,
                },
            });

            const checkOrderline = tempOrderline[0];

            if (!checkOrderline) {
                // there is no orderlin
                const createOrderline = await prisma.orderline.create({
                    data: {
                        kuantitas: qty,
                        total_harga: pakaian!.price * qty,
                        noted: "noted",
                        pakaian: {
                            connect: {
                                id: pakaian!.id,
                            },
                        },
                        keranjang: {
                            connect: {
                                id: keranjang.id,
                            },
                        },
                    },
                });
            } else {
                // update old orderline
                const updateOrderline = await prisma.orderline.updateMany({
                    where: {
                        pakaianId: pakaian!.id,
                        keranjangId: keranjang.id,
                    },
                    data: {
                        kuantitas: checkOrderline.kuantitas + qty,
                    },
                });
            }
        }
    }

    return NextResponse.json(
        { message: "Succesfully added pakaian" },
        { status: 200 }
    );
}
