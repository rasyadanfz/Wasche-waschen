import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { totalHarga } from "@/app/utils/totalharga";



const prisma = new PrismaClient();




export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    const {id} = params

    const transaksi = await prisma.transaksi.findMany({
        where:{
            userId:id    
        }
    })

    return NextResponse.json(
        {messagge:"Success",transaksi},
        {status:200}
    )


}

