import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

// finished testing
export async function DELETE(req:NextRequest){

    const {orderline} = await req.json();

    if(orderline === null){
        return NextResponse.json(
            {message:"Empty Orderline"},
            {status:400},
        )
    }

    if(orderline.kuantitas === 1){
        // we have to delete the orderline
        const deleteOrderline = await prisma.orderline.delete({
            where:{
                id:orderline.id
            }
        })

        return NextResponse.json(
            {message:"Orderline succesfully deleted"},
            {status:200}
        )

    }else{
        const updateOrderline = await prisma.orderline.update({
            where:{
                id:orderline.id
            },data:{
                kuantitas:orderline.kuantitas-1
            }
        })

        return NextResponse.json(
            {message:"Deletion successed"},
            {status:400}
        );

    }

}

export async function POST(req:NextRequest){

    // i'm still confused in this part. why do we need to separate transaksi and keranjang? 
    
    // ------------------ SOME CONFUSION
    /*
        1. shouldn't  keranjang is a must for every user?
        2. shouldn't each keranjang has a foreign key with transaction? 
            because if it isn't, then how could i attach transaction to each new orderline
        
    */
    const {pakaian,user,transaksi} = await req.json();

    if(!user){
        return NextResponse.json(
            {error:"No user"},
            {status:400}
        )
    }

    const keranjang = user.keranjang;

    if(!keranjang){
        return NextResponse.json(
            {error:"No keranjang"},
            {status:400}
        )
    }

    const tempOrderline = await prisma.orderline.findMany({
        where:{
            pakaianId: pakaian.id,
            keranjangId:keranjang.id,
        }
    })

    const orderline = tempOrderline[0];


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
            message:"Succesfully added new cloth",
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
            message:"Succesfully added the cloth",
            status:200
        })

    }

    

}