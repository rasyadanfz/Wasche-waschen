"use client";

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import CardTransaksi from "./CardTransaksi";
import Link from "next/link";
import FormInput from "@/components/FormInput";
import Pagination from "@/components/Pagination";

interface Transaksi {
  id: string;
  nama: string;
  tanggal: string;
  status: string;
  total_harga: Number;
  userId: string;
  nama_customer: string;
}

async function getDataTransaksi() {
  const res = await fetch("/api/transaksi", {
    method: "GET",
  });
  const dataTransaksi = await res.json();
  return dataTransaksi;
}

export default function Transaksi() {
  const [dataTransaksi, setDataTransaksi] = useState<Transaksi[] | null>(null);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataTransaksi); // State untuk menyimpan data yang telah difilter
  const [currentPage, setCurrentPage] = useState(1); // State untuk menyimpan data halaman yang sedang dibuka
  const itemsPerPage = 5; // Jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataTransaksi();
        setDataTransaksi(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  const [statusFilters, setStatusFilters] = useState({
    done: false,
    onProgress: false,
    notConfirmed: false,
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleSearch = () => {
    if (!dataTransaksi) return;
    const result = dataTransaksi.filter((item: Transaksi) => {
      const nameMatch = item.nama.toLowerCase().includes(query.toLowerCase());

      const statusMatch =
        (!statusFilters.done &&
          !statusFilters.onProgress &&
          !statusFilters.notConfirmed) ||
        (statusFilters.done && item.status === "Done") ||
        (statusFilters.onProgress && item.status === "On Progress") ||
        (statusFilters.notConfirmed && item.status === "Not Confirmed");

      const dateMatch =
        (!startDate || new Date(item.tanggal) >= new Date(startDate)) &&
        (!endDate || new Date(item.tanggal) <= new Date(endDate));

      return nameMatch && statusMatch && dateMatch;
    });

    setFilteredData(result);
    setCurrentPage(1);
  };

  // Logika untuk mengatur data yang ditampilkan pada setiap halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredData !== null
      ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredData(dataTransaksi);
  }, [dataTransaksi]);

  return (
    <>
      <div className="min-h-screen">
        <div className="w-full mb-[50px]">
          <div className="container mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md">
            <h1 className="font-bold text-h3 mt-[100px]">Daftar Transaksi</h1>
            <div className="">
              <div className="flex flex-row justify-between gap-6 items-end">
                <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md w-full">
                  <input
                    type="text"
                    placeholder="Cari Transaksi"
                    className="px-4 py-2 outline-none bg-transparent w-full focus:ring-1"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    className="px-4 py-2 bg-transparant rounded-md border text-black border-black font-semibold h-14 active:bg-primary active:text-white"
                    onClick={handleSearch}
                  >
                    <FaSearch size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <h1 className="font-semibold text-h6 mb-2">Filter by:</h1>
                <div className="flex flex-row gap-10">
                  <div className="flex flex-col">
                    <h2 className="text-lg mb-2">Status Transaksi</h2>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={statusFilters.done}
                        onChange={() =>
                          setStatusFilters((prevFilters) => ({
                            ...prevFilters,
                            done: !prevFilters.done,
                          }))
                        }
                      />
                      Done
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={statusFilters.onProgress}
                        onChange={() =>
                          setStatusFilters((prevFilters) => ({
                            ...prevFilters,
                            onProgress: !prevFilters.onProgress,
                          }))
                        }
                      />
                      On Progress
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={statusFilters.notConfirmed}
                        onChange={() =>
                          setStatusFilters((prevFilters) => ({
                            ...prevFilters,
                            notConfirmed: !prevFilters.notConfirmed,
                          }))
                        }
                      />
                      Not Confirmed
                    </label>
                  </div>
                  <div className="">
                    <h2 className="text-lg mb-2">Tanggal Transaksi</h2>
                    <div className="flex flex-row gap-2 items-center">
                      <input
                        type="date"
                        className="border border-black rounded-md px-2 py-1"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <p>to</p>
                      <input
                        type="date"
                        className="border border-black rounded-md px-2 py-1"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-col gap-4 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md">
          {dataTransaksi !== null ? (
            currentItems.length > 0 ? (
              currentItems.map((item: Transaksi) => (
                <CardTransaksi
                  key={item.id}
                  id={item.id}
                  nama={item.nama}
                  tanggal={item.tanggal}
                  status={item.status}
                  total_harga={item.total_harga}
                  nama_customer={item.nama_customer}
                />
              ))
            ) : (
              <h2 className="font-semibold text-center">Tidak ada transaksi</h2>
            )
          ) : (
            <h2 className="font-semibold text-center animate-pulse">
              Loading...
            </h2>
          )}
        </div>
        {/* Pagination Controls */}
        <Pagination
          filteredData={filteredData || []}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
}
