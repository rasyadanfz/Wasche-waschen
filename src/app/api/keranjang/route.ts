import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


export async function POST(req:NextRequest){
    const {user} = await req.json()

    if(!user){
        return NextResponse.json(
            {message:"There is no user"},
            {status:400}
        )
    }

    // create the keranjang

    const createKeranjang = await prisma.keranjang.create({
        data:{
            user:{
                connect:{
                    id:user.id,
                }
            }
        }
    })

    return NextResponse.json(
        {message:"Successfully created the keranjang"},
        {status:200}
    );

}

export async function PUT(req:NextRequest){
    const {ClothesCartData,user} = await req.json();

    // find keranjang first

    const keranjang = await prisma.keranjang.findUnique({
        where:{
            userId:user.id
        }
    })

    for(let i = 0;i < ClothesCartData.length;i++){
        // update each pakaian
        
        if(ClothesCartData[i].kuantitas == 0){
            // delete
            const delPakaian = await prisma.orderline.deleteMany({
                where:{
                    pakaianId:ClothesCartData[i].pakaianId
                }
            })
        }else{
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


    }

    return NextResponse.json(
        {message:"Success"},
        {status:200}
    )
}

