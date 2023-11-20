"use client";

import { useEffect, useState } from "react";
import CardKeranjang from "./CartCard";
import Link from "next/link";

interface FullKeranjang {
  id: string;
  userId:string
  daftarPakaian:Pakaian[]
}
interface Pakaian {
    nama:String;
    count:number;
    harga:number
}



async function getDataKeranjang() {
  const res = await fetch("/api/FullKeranjang", {
    method: "GET",
  });
  const dataKeranjang = await res.json();
  return dataKeranjang;
}

export default function Keranjang() {
  const [dataKeranjang, setDataKeranjang] = useState<FullKeranjang | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataKeranjang();
        setDataKeranjang(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <div className="min-h-screen">
        <div className="w-full mb-[50px]">
          <div className="container mx-auto">
            <h1 className="font-bold text-h3 mt-[100px]">Keranjang</h1>
            <div className="">
              <div className="flex flex-row justify-between gap-6 items-end">
                <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md w-full">

                </div>
                <div className="flex justify-end mt-2">

                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-col gap-4">
            {
                dataKeranjang?.daftarPakaian !== null ?(
                    dataKeranjang?.daftarPakaian.length > 0 ? (
                    dataKeranjang?.daftarPakaian.forEach((item:Pakaian)=>{
                        return (
                        <CardKeranjang
                            namaPakaian={item.nama}
                            kuantitas={item.count}
                            total_harga={item.harga}
                        />)
                    })
                    ) : <h2 className="font-semibold text-center">Keranjang kosong</h2>
                ):(
                    <h2>NUL <BITCH></BITCH></h2>
                )
                
            }
            

          
        </div>
          
    </div>
    </>
  );
}
