"use client";

import { FaSearch } from "react-icons/fa";
import React, { useEffect, useMemo, useState } from "react";
import CardRiwayat from "./CardRiwayat";


interface Transaksi {
  id: string
  nama: string
  tanggal: string
  status: string
  total_harga: Number
}

async function getDataTransaksi() {
  const res = await fetch("/api/transaksi", {
    method: "GET",
  });
  const dataTransaksi = await res.json();
  return dataTransaksi;
}

export default function RiwayatTransaksi() {

  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataTransaksi); // State untuk menyimpan data yang telah difilter
  const [currentPage, setCurrentPage] = useState(1); // State untuk menyimpan data halaman yang sedang dibuka
  const itemsPerPage = 5; // Jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataTransaksi();
      setDataTransaksi(data);
      console.log(data);
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
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredData(dataTransaksi);
  }, [dataTransaksi]);

  return (
    <>
      <div className="w-full min-h-scree mb-[50px]">
        <div className="container mx-auto">
          <h1 className="font-bold text-3xl mt-[100px]">Riwayat Transaksi</h1>
          <div className="">
            <div className="flex flex-row justify-between gap-6 items-end">
              <div className="flex items-center gap-2 border border-black rounded-md w-full px-4 py-2 mt-4 h-14">
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
              <h1 className="font-semibold text-lg mb-2">Filter by:</h1>
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
      <div className="container mx-auto flex flex-col gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((item: Transaksi) => (
            <CardRiwayat
              key={item.id}
              id={item.id}
              nama={item.nama}
              tanggal={item.tanggal}
              status={item.status}
              total_harga={item.total_harga}
            />
          ))
        ) : (
          <h2 className="font-semibold text-center">Tidak ada transaksi</h2>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-5 gap-4 mb-5 ">
        {Array(Math.ceil(filteredData.length / itemsPerPage))
          .fill(null)
          .map((_, i) => (
            <button
              className={`border-black border px-2 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
              key={i}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </>
  );
}
