"use client";

// Transaksi.tsx
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import CardRiwayat from "./CardRiwayat";
import Pagination from "@/components/Pagination";
import { getSession } from "next-auth/react";
import FilterTransaksi from "./FilterTransaksi";

interface Transaksi {
  id: string;
  nama: string;
  tanggal: string;
  status: string;
  total_harga: Number;
  userId: string;
}

interface User {
  id: string;
}

async function getDataTransaksi() {
  const session = await getSession();
  const user = session?.user as User;
  const userId = user.id;

  const res = await fetch(`/api/transaksi?user=${userId}`, {
    method: "GET",
  });
  const dataTransaksi = await res.json();
  return dataTransaksi;
}

export default function Transaksi() {
  const [dataTransaksi, setDataTransaksi] = useState<Transaksi[] | null>(null);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataTransaksi);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataTransaksi();
        setDataTransaksi(data);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleResetFilter = () => {
    setStatusFilters({
      done: false,
      onProgress: false,
      notConfirmed: false,
    });
    setStartDate("");
    setEndDate("");
    setQuery("");
    setFilteredData(dataTransaksi);
    setCurrentPage(1);
  }

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
    <div id="riwayat-transaksi">
      <div className="min-h-screen">
        <div className="w-full mb-[50px]">
          <div className="container mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md">
            <h1 className="font-bold text-h3 mt-[100px]">Riwayat Transaksi</h1>
            <div className="">
              <div className="flex flex-row justify-between gap-6 items-end">
                <div className="flex border items-center border-black bg-[#EDEDED] justify-between py-1.5 px-5 rounded-md w-full">
                  <FaSearch size={18} />
                  <input
                    id="searchRiwayatTransaksi"
                    type="text"
                    placeholder="Cari Transaksi"
                    className="px-4 py-2 outline-none bg-transparent w-full active:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <FilterTransaksi
                    statusFilters={statusFilters}
                    startDate={startDate}
                    endDate={endDate}
                    setStatusFilters={setStatusFilters}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    handleSearch={handleSearch}
                    handleClearFilter={handleResetFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex flex-col gap-4 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md">
          {dataTransaksi !== null ? (
            currentItems.length > 0 ? (
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
            )
          ) : (
            <h2 className="font-semibold text-center animate-pulse">
              Loading...
            </h2>
          )}
        </div>

        <Pagination
          filteredData={filteredData || []}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
