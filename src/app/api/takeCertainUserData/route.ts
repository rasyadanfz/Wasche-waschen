
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:NextRequest){

    const {user} = await req.json();

    /*
        we want to take 
            - list of possible pakaian
            - list of his or her transaction
            - list of orderline in his or her keranjang
    */

    const pakaian = await prisma.pakaian.findMany()
    const transaction = await prisma.transaksi.findMany({
        where:{
            userId:user.id
        }
    })

    const keranjang = await prisma.keranjang.findMany({
        where:{
            userId:user.id
        }
    })
    console.log(keranjang)

    const orderline = await prisma.orderline.findMany({
        
    })
    return NextResponse.json({
        user,
        pakaian,
        transaction,
        orderline
    })
}



