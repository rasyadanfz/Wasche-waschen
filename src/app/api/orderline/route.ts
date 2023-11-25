import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



export async function PATCH(req:NextRequest){

    const {ArrayOfOrderline} = await req.json();

    if(!ArrayOfOrderline){
        return NextResponse.json(
            {message:"There is no array of orderline"},
            {status:200}
        );
    }

    // delete each element
    for(let i = 0;i < ArrayOfOrderline.length;i++){
        const oldOrderline = ArrayOfOrderline[i];

        if(oldOrderline.kuantitas === 0){
            // delete the orderline
            const deleteOrderline = await prisma.orderline.delete({
                where:{
                    id:oldOrderline.id
                }
            })
        }else{
            // just edit the orderline
            const editOrderline = await prisma.orderline.update({
                where:{
                    id:oldOrderline.id
                },data:{
                    kuantitas:oldOrderline.kuantitas
                }
            })
        }
    }

    return NextResponse.json(
        {message:"Finished updating the orderline"},
        {status:200}
    );

}

export async function POST(req:NextRequest){

    const {user,ArrayOfPakaianCnt} = await req.json();
    if(!user){
        return NextResponse.json(
            {error:"No user"},
            {status:400}
        )
    }

    if(!ArrayOfPakaianCnt){
        return NextResponse.json(
            {error:"No Array of PakaianCnt"},
            {status:400}
        )
    }

    const keranjang = await prisma.keranjang.findUnique({
        where:{
            userId:user.id
        }
    })

    if(!keranjang){
        return NextResponse.json(
            {error:"No Keranjang"},
            {status:400}
        )  
    }


    for(let i = 0;i < ArrayOfPakaianCnt.length;i++){
        if(ArrayOfPakaianCnt[i].count != 0){
            // check whether there's already an orderline of that pakaian or not
            const pakaian = ArrayOfPakaianCnt[i].pakaian;
            const tempOrderline = await prisma.orderline.findMany({
                where:{
                    keranjangId:keranjang.id,
                    pakaianId:pakaian.id,
                }
            })

            
            const checkOrderline = tempOrderline[0];

            if(!checkOrderline){
                // there is no orderlin
                const createOrderline = await prisma.orderline.create({
                    data:{
                        kuantitas:ArrayOfPakaianCnt[i].count,
                        total_harga:pakaian.price,
                        noted:"noted",
                        pakaian:{
                            connect:{
                                id:pakaian.id,
                            }
                        },
                        keranjang:{
                            connect:{
                                id:keranjang.id,
                            }
                        }
                    }
                })
            }else{
                // update old orderline
                const updateOrderline = await prisma.orderline.updateMany({
                    where:{
                        pakaianId:pakaian.id,
                        keranjangId:keranjang.id,
                    },data:{
                        kuantitas:checkOrderline.kuantitas+ArrayOfPakaianCnt[i].count
                    }
                })
            }

        }
    }


    return NextResponse.json(
        {message:"Succesfully added pakaian"},
        {status:200}
    )

    

    /*
    const {pakaian,user} = await req.json();



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

    if(orderline === null){
        // create new orderline
        const createOrderline = await prisma.orderline.create({
            data:{
                kuantitas:1,
                total_harga:pakaian.price,
                noted:"Noted",
                pakaian:{
                    connect:{
                        id:pakaian.id,
                    }
                },
                keranjang:{
                    connect:{
                        id:keranjang.id,
                    }
                },
            }
        })
    }else{

    }


    
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

    */   

}