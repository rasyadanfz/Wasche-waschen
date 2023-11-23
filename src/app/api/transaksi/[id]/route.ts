import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { totalHarga } from "@/app/utils/totalharga";



const prisma = new PrismaClient();




export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    const {id} = params

    const pakaian = await prisma.orderline.findMany({
        where:{
            transaksiId:id
        }
    })

    return NextResponse.json(
        {messagge:"Success",pakaian},
        {status:200}
    )


}

