"use client"

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Pakaian from "./Pakaian"

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
    };

    fetchData();
  }, []);

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataPakaian);

  const handleSearch = () => {
    // still have bugs, don't know where
    const result = dataPakaian.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(query.toLowerCase());
      return nameMatch;
    });

    setFilteredData(result);
    console.log(result);
  }

  return (
    <>
      <div className="w-full min-h-screen mb-[50px]">
        <div className="container mx-auto">
          <h1 className="font-bold text-3xl mt-[100px]">Pakaian</h1>
          <div className="flex flex-row justify-between gap-6 items-end">
            <div className="flex items-center gap-2 border border-black rounded-md w-full px-4 py-2 mt-4 h-14">
              <input
                type="text"
                placeholder="Cari Pakaian"
                className="px-4 py-2 outline-none bg-transparent w-full focus:ring-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                className="px-4 py-2 bg-transparent rounded-md border text-black border-black font-semibold h-14 active:bg-primary active:text-white"
                onClick={handleSearch} // still have bugs, don't know where
              >
                <FaSearch size={18} />
              </button>
            </div>
          </div>
          <div>
            {dataPakaian.map((pakaian) => (
              <Pakaian pakaian={pakaian} key={pakaian.id} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default KatalogPakaian