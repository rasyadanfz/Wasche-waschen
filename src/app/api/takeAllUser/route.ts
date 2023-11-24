
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    const user = await prisma.user.findMany();
    return NextResponse.json({
        user
    }
    )

}


