
import Keranjang from "@/app/cart/components/CartPage";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function GET(req:NextRequest,{params}:{params:{id:string}}){

    const {id} =  params;
    console.log("HERE")
    
    if(!id){
        return NextResponse.json({
            error:"There is no user",
            status:400
        })
    }

    // we can proceed to take the cart

    const Keranjang = await prisma.keranjang.findUnique({
        where:{
            userId:id
        }
    })

    if(!Keranjang){
        return NextResponse.json({
            error:"This user has no keranjang",
            status:400
        })
    }

    const orderline = await prisma.orderline.findMany({
        where:{
            keranjangId:Keranjang.id
        }
    })

    return NextResponse.json({
        orderline
    })

}



