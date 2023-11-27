import type { Orderline } from "@prisma/client";
import type { ClothesCartData } from "../api/keranjang/[id]/route";

export function calculateTotalHarga(listOrderLine:ClothesCartData[]){
    var sum = 0;
    listOrderLine.forEach((ol)=>{
        sum = (sum + ol.total_harga)
    })
    
    return sum;
}
