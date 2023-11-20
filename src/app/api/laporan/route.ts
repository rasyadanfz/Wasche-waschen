import { ReportClothesData } from "@/app/(pages)/(loggedIn)/laporan/components/JenisPakaianTable";
import { Pakaian, PrismaClient, Transaksi } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const pastDays = 7;
const pastWeeks = 4;
const pastMonths = 6;

export interface ReportData {
    startDate: Date;
    endDate: Date;
    totalTransactions: number;
    totalPendapatan: number;
    clothesReport: ReportClothesData[];
}

const getTotalTransactions = (transactionList: Transaksi[]) => {
    return transactionList.length;
};

const getTotalRevenue = (transactionList: Transaksi[]) => {
    return transactionList.reduce(
        (total, transaction) => total + transaction.total_harga,
        0
    );
};

const getClothesReportData = async (transactionList: Transaksi[]) => {
    const transactionIds = transactionList.map((transaction) => {
        return transaction.id;
    });
    const arrayOrderlines = await prisma.orderline.findMany({
        where: {
            transaksiId: {
                in: transactionIds,
            },
        },
    });

    // Store each pakaian quantity into a Map
    const clothesMap = new Map();
    const getEachPakaian = await Promise.all(
        arrayOrderlines.map(async (orderline) => {
            const pakaian = await prisma.pakaian.findUnique({
                where: {
                    id: orderline.pakaianId,
                },
            });
            const qty = orderline.kuantitas;

            // Insert to Map
            let foundPakaian: Pakaian | undefined;
            for (const key of clothesMap.keys()) {
                if (key.id === pakaian?.id) {
                    foundPakaian = key;
                    break;
                }
            }

            if (foundPakaian) {
                clothesMap.set(
                    foundPakaian,
                    clothesMap.get(foundPakaian) + qty
                );
            } else {
                clothesMap.set(pakaian, qty);
            }
        })
    );

    // Convert map to an array and sort
    const sortedArray = Array.from(clothesMap.entries()).sort(
        (a, b) => b[1] - a[1]
    );

    let itemList: { name: string; price: number; quantity: number }[] = [];
    // For each items, get name, price, and quantity, then add to clothes Array
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

    return itemList;
};

const getReportData = async (
    filteredTransactionData: Transaksi[],
    type: "harian" | "mingguan" | "bulanan",
    backNum: number
) => {
    let data: ReportData = {
        startDate: new Date(),
        endDate: new Date(),
        totalTransactions: 0,
        totalPendapatan: 0,
        clothesReport: [],
    };

    if (type === "harian") {
        const date = new Date();
        date.setDate(date.getDate() - backNum);
        date.setHours(7, 0, 0, 0);

        // Filter based on pastDate
        const transactionData = filteredTransactionData.filter(
            (transaction) => {
                const transactionDate = new Date(transaction.tanggal);
                transactionDate.setHours(7, 0, 0, 0);
                return transactionDate >= date && transactionDate <= date;
            }
        );

        data.totalPendapatan = getTotalRevenue(transactionData);
        data.totalTransactions = getTotalTransactions(transactionData);
        data.clothesReport = await getClothesReportData(transactionData);
        data.startDate = date;
        data.endDate = date;
    } else if (type === "mingguan") {
        const currDate = new Date();
        const date = new Date(currDate);
        date.setDate(currDate.getDate() - backNum * 7 - 6);
        date.setHours(7, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setDate(date.getDate() + 6);

        const transactionData = filteredTransactionData.filter(
            (transaction) => {
                const transactionDate = new Date(transaction.tanggal);
                transactionDate.setHours(7, 0, 0, 0);
                return transactionDate >= date && transactionDate <= endDate;
            }
        );

        data.totalPendapatan = getTotalRevenue(transactionData);
        data.totalTransactions = getTotalTransactions(transactionData);
        data.clothesReport = await getClothesReportData(transactionData);
        data.startDate = date;
        data.endDate = endDate;
    } else if (type === "bulanan") {
        const currDate = new Date();
        const date = new Date(currDate);
        date.setMonth(currDate.getMonth() - backNum);
        date.setHours(7, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);

        const transactionData = filteredTransactionData.filter(
            (transaction) => {
                const transactionDate = new Date(transaction.tanggal);
                transactionDate.setHours(7, 0, 0, 0);
                return (
                    transactionDate.getMonth() === date.getMonth() &&
                    transactionDate.getFullYear() === date.getFullYear()
                );
            }
        );

        data.totalPendapatan = getTotalRevenue(transactionData);
        data.totalTransactions = getTotalTransactions(transactionData);
        data.clothesReport = await getClothesReportData(transactionData);
        data.startDate = date;
        data.endDate = endDate;
    }

    return data;
};

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type");

    const transactionData = await prisma.transaksi.findMany({
        where: {
            status: "Done",
        },
    });

    if (type === "harian") {
        // Set Starting Date to pastDataCount days
        const startingDate = new Date();
        startingDate.setDate(startingDate.getDate() - pastDays);
        startingDate.setHours(7, 0, 0, 0);

        // Filter past data
        const filteredTransactionData = transactionData.filter(
            (transaction) => {
                const transactionDate = new Date(transaction.tanggal);
                transactionDate.setHours(7, 0, 0, 0);
                return transactionDate >= startingDate;
            }
        );

        // Find today's data and calculate total transaction and revenue
        const todayData = await getReportData(
            filteredTransactionData,
            "harian",
            0
        );

        // Find past pastDataCount days of data and calculate each total transaction and revenue
        const pastData = [];
        for (let i = 1; i < pastDays; i++) {
            const eachPastData = await getReportData(
                filteredTransactionData,
                "harian",
                i
            );
            pastData.push(eachPastData);
        }

        return NextResponse.json({
            status: 200,
            data: {
                current: todayData,
                past: pastData,
            },
        });
    } else if (type === "mingguan") {
        // Calculate starting date
        const currDate = new Date();
        const startingDate = new Date(currDate);
        startingDate.setDate(currDate.getDate() - 4 * 7 + 1);
        startingDate.setHours(7, 0, 0, 0);

        // Filter past data
        const filteredTransactionData = transactionData.filter(
            (transaction) => {
                const transactionDate = new Date(transaction.tanggal);
                transactionDate.setHours(7, 0, 0, 0);
                return transactionDate >= startingDate;
            }
        );

        // Find current week data
        const currWeekData = await getReportData(
            filteredTransactionData,
            "mingguan",
            0
        );

        const pastData = [];
        for (let i = 1; i < pastWeeks; i++) {
            const eachPastData = await getReportData(
                filteredTransactionData,
                "mingguan",
                i
            );
            pastData.push(eachPastData);
        }

        return NextResponse.json({
            status: 200,
            data: {
                current: currWeekData,
                past: pastData,
            },
        });
    } else if (type === "bulanan") {
        // Calculate starting date
        const currDate = new Date();
        const startingDate = new Date(currDate);
        startingDate.setMonth(currDate.getMonth() - pastMonths);
        startingDate.setHours(7, 0, 0, 0);

        // Filter past data
        const filteredTransactionData = transactionData.filter(
            (transaction) => {
                const transactionDate = new Date(transaction.tanggal);
                transactionDate.setHours(7, 0, 0, 0);
                return transactionDate >= startingDate;
            }
        );

        // Find current month data
        const currMonthData = await getReportData(
            filteredTransactionData,
            "bulanan",
            0
        );

        const pastData = [];
        for (let i = 1; i < pastMonths; i++) {
            const eachPastData = await getReportData(
                filteredTransactionData,
                "bulanan",
                i
            );
            pastData.push(eachPastData);
        }

        return NextResponse.json({
            status: 200,
            data: {
                current: currMonthData,
                past: pastData,
            },
        });
    }
}
