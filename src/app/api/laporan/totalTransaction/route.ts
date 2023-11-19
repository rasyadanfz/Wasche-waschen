import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

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

    // Get All Transaction Data based on selector
    const { selector } = await req.json();
    const pastDataCount = 5; // Seberapa jauh ke belakang data yang diambil
    const transactionData = await prisma.transaksi.findMany();

    switch (selector) {
        case "harian":
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - pastDataCount);
            startDate.setHours(0, 0, 0, 0);
            // Filter data for pastDataCount days
            const filteredData = transactionData.filter((transaction) => {
                const transactionDate = new Date(transaction.tanggal);
                transactionDate.setHours(0, 0, 0, 0);
                return transactionDate >= startDate;
            });

            
            break;
        case "mingguan":
            break;
        case "bulanan":
            break;
    }
}
