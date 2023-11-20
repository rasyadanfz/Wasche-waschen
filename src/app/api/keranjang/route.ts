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

