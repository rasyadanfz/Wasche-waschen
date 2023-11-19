import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    // 
    const {pakaian,keranjang,orderline,transaksi} = await req.json();

    if(!transaksi){
        return NextResponse.json(
            {error:"Transaksi tidak boleh kosong"},
            {status:400},
        )
    }

    if(!pakaian){
        return NextResponse.json(
            {error:"Pakaian tidak boleh kosong"},
            {status:400}
        );
    }

    if(!keranjang){
        return NextResponse.json(
            {error:"Keranjang tidak boleh kosong"},
            {status:400}
        )
    }


    // we can do the create or update


    // make sure whether the orderline has exist or not
    if(orderline.id === null){
        // create new orderline
        const newOrderline = await prisma.orderline.create({
            data: {
                kuantitas:1,
                total_harga:pakaian.price,
                pakaian:{
                    connect:{
                        id:pakaian.id,
                    }
                },
                noted:"",
                keranjang:{
                    connect:{
                        id:keranjang.id,
                    }
                },
                transaksi:{
                    connect:{
                        id:transaksi.id,
                    }
                },
              },

        })

        return NextResponse.json({
            message:"Berhasil menambah pakaian",
            status:200,
        })


    }else{

        // update old orderline
        const updateOrderline = await prisma.orderline.update({
            where:{
                id:orderline.id
            },data:{
                total_harga:orderline.total_harga + pakaian.price,
                kuantitas: orderline.kuantitas+1
            }
        })

        return NextResponse.json({
            message:"Berhasil menambah pakaian",
            status:200
        })

    }

    

}