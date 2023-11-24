import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { totalHarga } from "@/app/utils/totalharga";

const prisma = new PrismaClient();

export async function POST(req:NextRequest){

    const all = await req.json();
    const id = all.user.id;
    if(!id){
        return NextResponse.json(
            {message:"There is no userId"},
            {status:400}
        )
    }

    // find the keranjang first

    const keranjang = await prisma.keranjang.findUnique({
        where:{
            userId:id
        }
    })


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
            userId:id
        }
    })
    


    for(let i = 0;i < orderLineList.length;i++){
        // edit keranjangId
        const editOrderline = await prisma.orderline.update({
            where:{
                id:orderLineList[i].id
            },data:{
                keranjangId:null,
                transaksiId:newTransaksi.id,
            }
        })
    }


    return NextResponse.json(
        {message:"Succesfully create a new transaction",newTransaksi},
        {status:200},
        
        
    );
    

}


