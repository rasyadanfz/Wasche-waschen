"use client";

import { useEffect, useState } from "react";
import CardTransaksi from "./CardTransaksi";
import Pagination from "@/components/Pagination";
import FilterTransaksi from "./FilterTransaksi";

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
    const [dataTransaksi, setDataTransaksi] = useState<Transaksi[] | null>(
        null
    );
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
            const nameMatch = item.nama
                .toLowerCase()
                .includes(query.toLowerCase());

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
    };

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
        <div id="transaksi">
            <div className="min-h-screen container mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md px-5 md:px-0">
                <div className="w-full mb-[50px]">
                    <div className="">
                        <h1 className="font-bold text-h4 md:text-h3 mt-[100px]">
                            Daftar Transaksi
                        </h1>
                        <div className="">
                            <div className="flex flex-row justify-between gap-6 items-end">
                                <div className="flex border border-black bg-[#EDEDED] justify-between py-1.5 px-3 rounded-md w-full">
                                    <input
                                        id="searchTransaksi"
                                        type="text"
                                        placeholder="Cari Transaksi"
                                        className="px-4 py-2 outline-none bg-transparent w-full focus:ring-1"
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
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
                <div className="flex flex-col gap-4">
                    {dataTransaksi !== null ? (
                        currentItems.length > 0 ? (
                            currentItems
                                .reverse()
                                .map((item: Transaksi) => (
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
                            <h2 className="font-semibold text-center">
                                Tidak ada transaksi
                            </h2>
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
        </div>
    );
}
