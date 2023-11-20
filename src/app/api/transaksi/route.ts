import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const {keranjang} = await req.json()


    if(!keranjang){
        return NextResponse.json(
            {message:"There is no keranjang"},
            {status:400}
        )
    }

    // there is keranjang
    
    const orderLineList = await prisma.orderline.findMany({
        where:{
            keranjangId:keranjang.id
        }
    })

    // create new transaction

    const newTransaksi = await prisma.orderline.create({
        data:{
            nama:"TempNama",
            
        }
    })

    for(let i = 0;i < orderLineList.length;i++){


    }




}