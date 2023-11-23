import { Orderline, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function POST(req:NextRequest){
    const {user} = await req.json();

    // take keranjang and all possible pakaian
    const pakaian = await prisma.pakaian.findMany();
    const keranjang = await prisma.keranjang.findUnique({
        where:{
            userId:user.id
        }
    })


    for(let i = 0;i < pakaian.length;i++){
        // insert
        const insertIt = await prisma.orderline.create({
            data:{
                kuantitas:999999,
                total_harga:pakaian[i].price*999999,
                noted:"YES",
                pakaianId:pakaian[i].id,
                keranjangId:keranjang?.id
            }
        })
    }

    return NextResponse.json(
        {message:"Success"},
        {status:200}
    )

}