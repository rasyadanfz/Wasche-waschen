"use client";
import { useEffect, useState } from "react";
 
interface Orderline{
  id:string;
  kuantitas:number;
  total_harga:number;
  noted:string;
  pakaianId:string;
  transaksiId:string;
  keranjangId:string;
}

interface User{
  id:string;
  email:string;
  name:string;
  no_telp:string;
  hashedPassword:string;
  role:string;
}



async function getDataKeranjang() {


  // don't forget to change this variable
  const temp =  {
    //"id": "655b3c904a05e60bdfe5318d",
    "id": "655b3c904a05e60bdfe5318d",
    "email": "18221071@std.stei.itb.ac.id",
    "name": "Ahmad Rizki",
    "no_telp": "+6282343765854",
    "hashedPassword": "$2b$10$Xd0mu3Sd6xlaFrGXWgMZRusMJPsFyr/QFueSU0cTmplpMX0h4W6Lm",
    "role": "Customer"
}

  const res = await fetch("/api/forCartPage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: temp,
    }),
  });
  
  let dataKeranjang;
  if(res !== undefined)  dataKeranjang = await res.json();
  else dataKeranjang = [];
  return dataKeranjang.orderline;
}


export default function CartPage() {

  const [dataKeranjang,setDataKeranjang] = useState([]);
  
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await getDataKeranjang();
        setDataKeranjang(res);
        console.log(res);
      }catch(error){
        console.error('Error fetching data : ',error);
      }
    }

    fetchData();
  },[])





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
              (<p className="font-black text-2xl" >it isnt</p>)
           }
        </div>
      </div>
    </>
  );
}
