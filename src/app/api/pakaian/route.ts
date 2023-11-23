import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const data = await prisma.existingPakaian.findMany();
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

export async function PUT( req: NextRequest ) {
    const params = new URLSearchParams(req.nextUrl.search);
    const id = params.get("id");
    const body = await req.json();
    const price = body.price;
    
    try {
        const updateData = await prisma.pakaian.update({
            where: {
                id: id as string
            },
            data: {
                price: price
            }
        });
        return NextResponse.json(updateData, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error occured." }, { status: 403 })
    }
    finally {
        await prisma.$disconnect();
    }
}

export async function DELETE( req: NextRequest) {
    const params = new URLSearchParams(req.nextUrl.search);
    const id = params.get("id");
    
    try {
        await prisma.orderline.deleteMany({
            where: {
                pakaianId: id as string
            }
        })

        const deletedData = await prisma.pakaian.delete({
            where: {
                id: id as string
            }
        });
        return NextResponse.json(deletedData, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error occured." }, { status: 403 })
    }
    finally {
        await prisma.$disconnect();
    }
}
