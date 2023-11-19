import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req:NextRequest){
    // 
    const user = await prisma.user.findUnique({
        where:{
            id: "65560efce9a08702271b954b"
        }
    })

    const pakaian = await prisma.pakaian.findMany();
    const keranjang = await prisma.keranjang.findMany({
        where:{
            userId:user?.id
        }
    });
    const orderline = await prisma.orderline.findMany({
        where:{
            keranjangId:keranjang?.id,
        }
    })
    
    const transaksi = await prisma.transaksi.findMany({
        where:{
            userId:user?.id,
        }
    })
        
    return NextResponse.json({
        
        messagtrane:"Berhasil menambah pakaian",
        status:200,
        "pakaian":pakaian,
        "user":user,
        "orderline":orderline,
        "keranjang":keranjang,
        "transaksi":transaksi
        
    })

    

}