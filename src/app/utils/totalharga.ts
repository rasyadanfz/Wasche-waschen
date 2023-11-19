import type { Orderline } from "@prisma/client";

export function totalHarga(listOrderLine:Orderline[]){
    var sum = 0;
    listOrderLine.forEach((ol)=>{
        sum = (sum + ol.total_harga)
    })
    
    return sum;
}