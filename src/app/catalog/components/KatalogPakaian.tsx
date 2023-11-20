"use client"

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import PakaianComponent from "./PakaianComponent";
import { Pakaian } from "@prisma/client";
import Pagination from "../../../components/Pagination";
import Dropdown from "@/app/catalog/components/Dropdown";

async function getDataPakaian() {
  const res = await fetch("/api/pakaian", {
    method: "GET",
  });

  const dataPakaian = await res.json();
  return dataPakaian;
}

const KatalogPakaian = () => {
  const [dataPakaian, setDataPakaian] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataPakaian);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const onHandlePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    const fetchData = async() => {
      const data = await getDataPakaian();
      setDataPakaian(data);
      setFilteredData(data);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const result = dataPakaian.filter((item: Pakaian) => {
      const nameMatch = item.name.toLowerCase().includes(query.toLowerCase());
      return nameMatch;
    });

    setFilteredData(result);
  }

  const updateFilteredData = (startPrices: number[], endPrices: number[]) => {
    const filter = startPrices.map((startPrice, index) => {
      const temp = dataPakaian.filter((item: Pakaian) => {
        const endPrice = endPrices[index];
        return item.price >= startPrice && item.price <= endPrice;
      });
  
      return temp;
    });

    const flattened = filter.flat();
    const result = Array.from(new Set(flattened));
    setFilteredData(result);
  }

  const updateDataToOriginal = () => {
    setFilteredData(dataPakaian);
  }

  return (
    <>
      <div className="w-full min-h-screen mb-[50px]">
        <div className="container mx-auto max-w-screen-lg">
          <h1 className="font-bold text-3xl mt-[100px]">Pakaian</h1>
          <div className="flex flex-row justify-between gap-6 items-end">
            <div className="flex items-center gap-2 border border-black hover:bg-gray-100 rounded-md w-full px-4 py-2 mt-4 h-14">
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
                className="px-4 py-2 bg-transparent rounded-md border text-black border-black hover:bg-gray-100 font-semibold h-14 active:bg-primary active:text-white"
                onClick={handleSearch}
              >
                <FaSearch size={18} />
              </button>
            </div>
            <Dropdown updateFilteredData={updateFilteredData} updateDataToOriginal={updateDataToOriginal} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {currentItems.map((pakaian: Pakaian) => (
              <PakaianComponent pakaian={pakaian} key={pakaian.id} />
              ))}
          </div>
        </div>
      </div>

      <Pagination
       filteredData={filteredData}
       currentPage={currentPage}
       itemsPerPage={itemsPerPage}
       onHandlePage={onHandlePage}
       />
    </>
  )
}

export default KatalogPakaian