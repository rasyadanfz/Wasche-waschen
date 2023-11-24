import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    
    const {id} = params;
    
    
    if(!id){
        return NextResponse.json({
            error:"There is no user",
            status:400
        })
    }

    const keranjang = await prisma.keranjang.findUnique({
        where:{
            userId:id
        }
    })

    // take all orderline
    
    const orderline = await prisma.orderline.findMany({
        where:{
            keranjangId:keranjang?.id
        }
    })


    return NextResponse.json(
        {message:"success",orderline},
        {status:200}
    )



}