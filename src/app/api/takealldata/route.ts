import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req:NextRequest){
    // 
    const user = await prisma.user.findFirst();
    const pakaian = await prisma.pakaian.findMany();
    const keranjang = await prisma.keranjang.findUnique({
        where:{
            userId:user?.id
        }
    });
    const orderline = await prisma.orderline.findMany({
        where:{
            keranjangId:keranjang?.id,
        }
    })
        
    return NextResponse.json({
        
        message:"Berhasil menambah pakaian",
        status:200,
        "pakaian":pakaian,
        "user":user,
        "orderline":orderline,
        "keranjang":keranjang
        
    })

    

}