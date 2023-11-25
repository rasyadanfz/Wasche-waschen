import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prismaSingleton/prismaSingleClient";
import { totalHarga } from "@/app/utils/totalharga";

// Get all transactions
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    const id = searchParams.get("id");

    if (user) {
        try {
            const data = await prisma.transaksi.findMany({
                where: {
                    userId: user as string,
                },
                include: {
                    user: true,
                },
            });

            const formattedData = data.map((item) => {
                return {
                    id: item.id,
                    nama: item.nama,
                    total_harga: item.total_harga,
                    status: item.status,
                    tanggal: item.tanggal,
                    userId: item.userId,
                    nama_customer: item.user?.name,
                };
            });

            return NextResponse.json(formattedData, { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { error: "Error occured." },
                { status: 403 }
            );
        } finally {
            await prisma.$disconnect();
        }
    }

    if (id) {
        try {
            const detailTransaksi = await prisma.transaksi.findUnique({
                where: {
                    id: id as string,
                },
                include: {
                    user: true,
                    orderlines: {
                        include: {
                            pakaian: true,
                        },
                    },
                },
            });

            const formattedData = {
                id: detailTransaksi?.id,
                nama: detailTransaksi?.nama,
                total_harga: detailTransaksi?.total_harga,
                status: detailTransaksi?.status,
                tanggal: detailTransaksi?.tanggal,
                userId: detailTransaksi?.userId,
                nama_customer: detailTransaksi?.user?.name,
                orderlines: detailTransaksi?.orderlines.map((item) => {
                    return {
                        id: item.id,
                        kuantitas: item.kuantitas,
                        pakaian: item.pakaianId,
                        total_harga: item.total_harga,
                        nama_pakaian: item.pakaian?.name,
                        harga_pakaian: item.pakaian?.price,
                        unit_pakaian: item.pakaian?.unit,
                    };
                }),
            };

            return NextResponse.json(formattedData, { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { error: "Error occured." },
                { status: 403 }
            );
        } finally {
            await prisma.$disconnect();
        }
    }

    try {
        const data = await prisma.transaksi.findMany({
            include: {
                user: true,
            },
        });

        const formattedData = data.map((item) => {
            return {
                id: item.id,
                nama: item.nama,
                total_harga: item.total_harga,
                status: item.status,
                tanggal: item.tanggal,
                userId: item.userId,
                nama_customer: item.user?.name,
            };
        });

        return NextResponse.json(formattedData, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error occured." }, { status: 403 });
    }
}

// Update transaction status
export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error: "Missing ID parameter." },
            { status: 400 }
        );
    }

    try {
        const body = await req.json(); // Use req.json() to parse the JSON body

        if (!body) {
            return NextResponse.json(
                { error: "Invalid or missing JSON body." },
                { status: 400 }
            );
        }

        const updatedTransaksi = await prisma.transaksi.update({
            where: {
                id: id as string,
            },
            data: {
                status: body.status,
            },
            include: {
                user: true,
                orderlines: {
                    include: {
                        pakaian: true,
                    },
                },
            },
        });

        const formattedData = {
            id: updatedTransaksi.id,
            nama: updatedTransaksi.nama,
            total_harga: updatedTransaksi.total_harga,
            status: updatedTransaksi.status,
            tanggal: updatedTransaksi.tanggal,
            userId: updatedTransaksi.userId,
            nama_customer: updatedTransaksi.user?.name,
            orderlines: updatedTransaksi.orderlines.map((item) => {
                return {
                    id: item.id,
                    kuantitas: item.kuantitas,
                    pakaian: item.pakaianId,
                    nama_pakaian: item.pakaian?.name,
                    total_harga: item.total_harga,
                };
            }),
        };

        return NextResponse.json(formattedData, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error occurred while updating the status." },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// Create new transaction
export async function POST(req: NextRequest) {
    const { userId } = await req.json();
    const id = userId;
    if (!id) {
        return NextResponse.json(
            { message: "No user found!" },
            { status: 400 }
        );
    }

    // Find user keranjang by userId then find the associated orderlines
    const keranjang = await prisma.keranjang.findUnique({
        where: {
            userId: id,
        },
    });

    if (!keranjang) {
        return NextResponse.json(
            { message: "There is no keranjang" },
            { status: 400 }
        );
    }

    const orderLineList = await prisma.orderline.findMany({
        where: {
            keranjangId: keranjang.id,
        },
    });

    // Create new transaction
    const newTransaksi = await prisma.transaksi.create({
        data: {
            nama: String("Testing"),
            total_harga: totalHarga(orderLineList),
            tanggal: new Date().toISOString().split("T")[0],
            userId: id,
        },
    });

    // Update orderline data to have transaksiId and delete its keranjangId
    for (let i = 0; i < orderLineList.length; i++) {
        const editOrderline = await prisma.orderline.update({
            where: {
                id: orderLineList[i].id,
            },
            data: {
                keranjangId: null,
                transaksiId: newTransaksi.id,
            },
        });
    }

    return NextResponse.json(
        { message: "Succesfully created a new transaction", newTransaksi },
        { status: 200 }
    );
}
