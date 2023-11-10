"use client"
import { useEffect, useState } from "react";
import Pakaian from "./Pakaian"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function getDataPakaian() {
  const res = await fetch("/api/pakaian", {
    method: "GET",
  });

  const dataPakaian = await res.json();
  return dataPakaian;
}

const KatalogPakaian = () => {
  const [dataPakaian, setDataPakaian] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const data = await getDataPakaian();
      setDataPakaian(data);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        {dataPakaian.map((pakaian) => (
          <Pakaian pakaian={pakaian} key={pakaian.id} />
        ))}
      </div>
    </>
  )
}

export default KatalogPakaian