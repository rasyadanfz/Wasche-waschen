"use client";

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import PakaianComponent from "./PakaianComponent";
import { Pakaian } from "@prisma/client";
import Pagination from "@/components/Pagination";
import Dropdown from "./Dropdown";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

async function getDataPakaian() {
    const res = await fetch("/api/pakaian", {
        method: "GET",
    });

    const dataPakaian = await res.json();
    return dataPakaian;
}

const KatalogPakaian = () => {
    const session = useSession();
    if (!session) {
        redirect("/login");
    }

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
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDataPakaian();
            setDataPakaian(data);
            setFilteredData(data);
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const result = dataPakaian.filter((item: Pakaian) => {
            const nameMatch = item.name
                .toLowerCase()
                .includes(query.toLowerCase());
            return nameMatch;
        });

        setFilteredData(result);
    };

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
    };

    const updateDataToOriginal = () => {
        setFilteredData(dataPakaian);
    };

    return (
        <>
            <div className="w-full min-h-screen mb-[50px] bg-backgroundcolor">
                <div className="container mx-auto max-w-screen-lg">
                    <h1 className="font-bold text-3xl mt-[100px] font-raleway text-h2">
                        Pakaian
                    </h1>
                    <div className="flex flex-row justify-between gap-6 items-end">
                        <div className="flex items-center border border-black hover:bg-white rounded-md w-full px-4 mt-4 h-14">
                            <FaSearch size={18} />
                            <input
                                type="text"
                                placeholder="Cari Pakaian"
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
                        <Dropdown
                            updateFilteredData={updateFilteredData}
                            updateDataToOriginal={updateDataToOriginal}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {currentItems.map((pakaian: Pakaian) => (
                            <PakaianComponent
                                pakaian={pakaian}
                                key={pakaian.id}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Pagination
                filteredData={filteredData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                paginate={onHandlePage}
            />
        </>
    );
};

export default KatalogPakaian;
