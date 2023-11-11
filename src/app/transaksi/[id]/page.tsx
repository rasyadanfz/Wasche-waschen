"use client"

import { use, useEffect, useState } from "react";

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
}


export default function DetailTransaksiPage(props: DetailTransaksiPageProps) {
  const { id } = props.params;
  const [data, setData] = useState<Transaksi>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/detail-transaksi?id=${id}`, {
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
      <h1 className="">Detail Transaksi</h1>
      {data ? (
        <>
          <p>Detail transaksi dengan id: {id}</p>
          {data.nama ? (
            <>
              <p>Nama: {data.nama}</p>
              <p>Tanggal: {data.tanggal}</p>
              <p>Status: {data.status}</p>
              <p>Total Harga: {data.total_harga.toLocaleString()}</p>
              <p>User ID: {data.userId}</p>
            </>
          ) : (
            <p>Data tidak ditemukan</p>
          )}
        </>
      ) : (
        <p className="">Loading...</p>
      )}
    </>
  );
}