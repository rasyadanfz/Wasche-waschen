import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ status: 401, message: "Unauthorized" });
    } else if (session?.user) {
        const user = session?.user as { role: string };
        if (user.role !== "Admin") {
            return NextResponse.json({
                status: 401,
                message: "Unauthorized",
            });
        }
    }

    const startDate = req.nextUrl.searchParams.get("startDate");
    const endDate = req.nextUrl.searchParams.get("endDate");
    const allTransactions = await prisma.transaksi.findMany();
    const filteredAllTransactions = allTransactions.filter((transaction) => {
        if (startDate && endDate) {
            return (
                new Date(transaction.tanggal) >= new Date(startDate) &&
                new Date(transaction.tanggal) <= new Date(endDate)
            );
        } else if (startDate) {
            return new Date(transaction.tanggal) >= new Date(startDate);
        } else if (endDate) {
            return new Date(transaction.tanggal) <= new Date(endDate);
        } else {
            return true;
        }
    });

    // Calculate total transactions
    const totalTransactions = filteredAllTransactions.length;

    // Calculate total revenue
    const totalRevenue = filteredAllTransactions.reduce(
        (total, transaction) => total + transaction.total_harga,
        0
    );

    // Calculate each jenis pakaian into an array
    const arrayOrderlines = await prisma.orderline.findMany({
        where: {
            transaksiId: {
                in: filteredAllTransactions.map(
                    (transaction) => transaction.id
                ),
            },
        },
    });

    const clothesMap = new Map();

    const getEachPakaian = await Promise.all(
        arrayOrderlines.map(async (orderline) => {
            const pakaianName = await prisma.pakaian.findUnique({
                where: {
                    id: orderline.pakaianId,
                },
            });
            const qty = orderline.kuantitas;

            // Insert to Map
            if (!clothesMap.has(pakaianName)) {
                clothesMap.set(pakaianName, qty);
            } else {
                clothesMap.set(pakaianName, clothesMap.get(pakaianName) + qty);
            }
        })
    );

    // Sort Map
    const sortedArray = Array.from(clothesMap.entries()).sort(
        (a, b) => b[1] - a[1]
    );

    let responseToSend = [];
    let itemList: { name: string; price: number; quantity: number }[] = [];
    // For each items, get name, price, and quantity, then add to response JSON
    sortedArray.forEach((item) => {
        const data = item[0];
        const quantity = item[1];
        const itemObject = {
            name: data.name,
            price: data.price,
            quantity: quantity,
        };
        itemList.unshift(itemObject);
    });

    responseToSend.push(itemList);
    responseToSend.push(totalTransactions);
    responseToSend.push(totalRevenue);

    return NextResponse.json(responseToSend);
}
