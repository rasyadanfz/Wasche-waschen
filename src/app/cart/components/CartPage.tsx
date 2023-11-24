"use client";
import { useEffect, useState } from "react";
import { ClothesCartData } from "@/app/api/forCartPage/[id]/route";
import CartCard from "./CartCard";
import CreateOrderButton from "./CreateOrderButton";
import BackButton from "./BackButton";

//const session = useSession();


/*
  TO DO LIST
  -- FIX THE CREATE NEW ORDER
  -- ATLEAST MAKE THE CODE READABLE
  -- ADD BACK BUTTON

*/

async function updateCart(newCart:ClothesCartData[]){
  // const temp = session.data?.user

  const temp =         {
    "id": "65543009490065f9d1ba6441",
    "email": "test12345@gmail.com",
    "name": "test12345",
    "no_telp": "081234567890",
    "hashedPassword": "$2b$10$lLWKXunE2NujG0EymmmOde0BXur2yYaO2LdLZIWAA8Cs3GHTxjbTa",
    "role": "Customer"
  }

  const res = await fetch('/api/updateCart',{
    method:"POST",
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({
      "user":temp,
      "ClothesCartData":newCart
    }),
  }) 


  const data = await res.json();
  
  return res;

}

async function createNewTransaction(){
  
  // const temp = session.data?user
  const temp =         {
    "id": "65543009490065f9d1ba6441",
    "email": "test12345@gmail.com",
    "name": "test12345",
    "no_telp": "081234567890",
    "hashedPassword": "$2b$10$lLWKXunE2NujG0EymmmOde0BXur2yYaO2LdLZIWAA8Cs3GHTxjbTa",
    "role": "Customer"
  }

  const res = await fetch('/api/transaksi/',{
    method:"POST",
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({
      "user":temp
    }),
  }) 

  const data = await res.json();
  
  return res;

}

async function getDataKeranjang() {

  // don't forget to change this variable
  // const temp =  session.data?.user;
  const temp =         {
    "id": "65543009490065f9d1ba6441",
    "email": "test12345@gmail.com",
    "name": "test12345",
    "no_telp": "081234567890",
    "hashedPassword": "$2b$10$lLWKXunE2NujG0EymmmOde0BXur2yYaO2LdLZIWAA8Cs3GHTxjbTa",
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
  const [countChange,setCountChange] = useState(0);
  
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
  },[countChange])

  const handleSubtract = (index:number) =>{
    const newValues:ClothesCartData[] = [...dataKeranjang];
    const eachValue = (newValues[index].total_harga)/(newValues[index].kuantitas);
    if(newValues[index].kuantitas > 0){
      newValues[index].kuantitas-=1;
      newValues[index].total_harga-= eachValue;
      setDataKeranjang(newValues);
    }
  }








  return (
    <>
        <div className="flex flex-col mt-[80px]">
          <div className="flex items-baseline">
            <BackButton className="mx-[50px]"/>
            <p className="font-black text-2xl mb-[20px]" >Keranjang</p>
          </div>
          <div> 
          {
                (dataKeranjang.length === 0) ? 
                (<div className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] items-center justify-center"><p className="font-black text-2xl">Keranjang Kosong</p></div>) : 
                (<div>
                  {
                    dataKeranjang.map((item:ClothesCartData,index:number)=><CartCard subtract={()=>handleSubtract(index)} key={index} pakaianNama={item.pakaianNama} total_harga={item.total_harga} kuantitas={item.kuantitas} />)
                  }
                </div>)
          }
          </div>
        </div>
        <div>
          {
          (dataKeranjang.length !== 0) ? 
          <div className="flex flex-row">
          <CreateOrderButton onClick={async ()=> {await updateCart(dataKeranjang);setCountChange(countChange+1)}} className="mt-[20px] ml-[1050px] mb-[50px] items-center justify-center px-4 py-2" text="Update Keranjang"/>
          <CreateOrderButton onClick={async ()=> {await createNewTransaction();setCountChange(countChange+1)}} className="mt-[20px] ml-[50px] mb-[50px] items-center justify-center px-4 py-2"/> 
          </div> : (<div></div>)
          }
        </div>
    </>
  );
}
