import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function POST(req:NextRequest){
    const {ClothesCartData,user} = await req.json();

    // find keranjang first

    const keranjang = await prisma.keranjang.findUnique({
        where:{
            userId:user.id
        }
    })

    for(let i = 0;i < ClothesCartData.length;i++){
        // update each pakaian
        const updatePakaian = await prisma.orderline.updateMany({
            where:{
                pakaianId:ClothesCartData[i].pakaianId,
                keranjangId:keranjang?.id
            },data:{
                kuantitas:ClothesCartData[i].kuantitas,
                total_harga:ClothesCartData[i].total_harga
            }
        })
    }

    return NextResponse.json(
        {message:"Success"},
        {status:200}
    )

}