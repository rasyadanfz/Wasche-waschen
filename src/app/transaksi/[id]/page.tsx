"use client";

import { use, useEffect, useState } from "react";
import StatusDetailTransaksi from "./components/StatusDetailTransaksi";

type DetailTransaksiPageProps = {
  params: {
    id: string;
  };
};

interface Transaksi {
  id: string;
  nama: string;
  tanggal: string;
  status: string;
  total_harga: Number;
  userId: string;
  nama_customer: string;
}

export default function DetailTransaksiPage(props: DetailTransaksiPageProps) {
  const { id } = props.params;
  const [data, setData] = useState<Transaksi>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/transaksi?id=${id}`, {
          method: "GET",
        });
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div>
        <div className="w-full mb-[50px]">
          <div className="container mx-auto">
            <h1 className="font-bold text-3xl mt-[100px] mb-16">Detail Transaksi</h1>
            {data ? (
              <>
                <div className="flex flex-row gap-10 mb-12">
                  <h2 className="text-xl font-semibold">{data.nama}</h2>
                  <StatusDetailTransaksi status={data.status} />
                </div>
                <div className="flex flex-col gap-5">
                  <p>Kode Transaksi: {data.id}</p>
                  <p>Tanggal: {data.tanggal}</p>
                  <p>Nama Customer: {data.nama_customer}</p>
                  <p>Daftar Pakaian:</p>
                </div>
              </>
            ) : (
              <p className="">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
