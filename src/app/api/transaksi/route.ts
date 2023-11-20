import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { totalHarga } from "@/app/utils/totalharga";



const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const {keranjang} = await req.json()
    const user = keranjang.user


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

        // create a new date
    const newDate = new Date();



    const newTransaksi = await prisma.transaksi.create({
        data:{
            nama:String('Testing'),
            total_harga:totalHarga(orderLineList),
            tanggal:newDate.toUTCString(),
            userId:user.id,
        }
    })



    for(let i = 0;i < orderLineList.length;i++){
        orderLineList[i].keranjangId = null;
        orderLineList[i].transaksiId = newTransaksi.id;
    }

    return NextResponse.json(
        {message:"Succesfully create a new transaction"},
        {status:200}
    );



}