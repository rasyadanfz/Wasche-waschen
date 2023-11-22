"use client";
import { useEffect, useState } from "react";
import { ClothesCartData } from "@/app/api/forCartPage/[id]/route";
import CartCard from "./CartCard";


async function getDataKeranjang() {

  // don't forget to change this variable
  const temp =  {
    "id": "655debb944400e55eed08569",
    "email": "18221071@std.stei.itb.ac.id",
    "name": "Ahmad Rizki",
    "no_telp": "+6282343765854",
    "hashedPassword": "$2b$10$Xd0mu3Sd6xlaFrGXWgMZRusMJPsFyr/QFueSU0cTmplpMX0h4W6Lm",
    "role": "Customer"
}

  const res = await fetch(`/api/forCartPage/${temp.id}`, {
    method: "GET",
  });

  let dataKeranjang;
  if(res !== undefined)  dataKeranjang = await res.json();
  else dataKeranjang = [];

  return dataKeranjang.cartClothesData;
}

export default function CartPage() {

  const [dataKeranjang,setDataKeranjang] = useState<ClothesCartData[]>([]);
  
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await getDataKeranjang();
        setDataKeranjang(res);
      }catch(error){
        console.error('Error fetching data : ',error);
      }
    }
    fetchData();
  },[])

  const handleSubtract = (index:number) =>{
    const newValues:ClothesCartData[] = [...dataKeranjang];
    const eachValue = (newValues[index].total_harga)/(newValues[index].kuantitas);
    newValues[index].kuantitas-=1;
    newValues[index].total_harga-= eachValue;
    setDataKeranjang(newValues);
  }


  return (
    <>
      <div className="flex flex-col mt-[80px]">
        <div className="flex items-baseline">
          <p className="font-black text-2xl" >Keranjang</p>
        </div>
        <div> 
        {
              (dataKeranjang.length === 0) ? 
              (<div className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] items-center justify-center"><p className="font-black text-2xl">Keranjang Kosong</p></div>) : 
              (<div><p className="font-black text-2xl" >it isnt</p>
                {
                  dataKeranjang.map((item:ClothesCartData,index:number)=><CartCard subtract={handleSubtract(index)} key={index} pakaianNama={item.pakaianNama} total_harga={item.total_harga} kuantitas={item.kuantitas} />)
                }
              </div>)
        }
        </div>
      </div>
    </>
  );
}
