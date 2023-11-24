import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET( req: NextRequest ) {
    try {
        const params = new URLSearchParams(req.nextUrl.search);
        const id = params.get("id");

        let data;

        if (id) {
            data = await prisma.existingPakaian.findUnique({
                where: {
                    id: id
                }
            });
        }
        else {
            data = await prisma.existingPakaian.findMany();
        }

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

export async function POST( req: NextRequest ) {
    const body = await req.json();
    const name = body.name;
    const price = body.price;
    const unit = body.unit;
    
    try {
        const data = await prisma.pakaian.create({
            data: {
                name: name,
                price: price,
                unit: unit,
                existingPakaian: {
                    create: {
                        name: name,
                        price: price,
                        unit: unit,
                    }
                }
            }
        });
        return NextResponse.json(data, { status: 200 });
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
        const deletedData = await prisma.existingPakaian.delete({
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
