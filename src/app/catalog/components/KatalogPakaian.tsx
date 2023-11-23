"use client"

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import PakaianComponent from "./PakaianComponent";
import { Pakaian } from "@prisma/client";
import Pagination from "../../../components/Pagination";
import Dropdown from "@/app/catalog/components/Dropdown";
import Button from "@/components/Button";
import Image from "next/image"
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getDataPakaian() {
  const res = await fetch("/api/pakaian", {
    method: "GET",
  });

  const dataPakaian = await res.json();
  return dataPakaian;
}

const KatalogPakaian = () => {
  const session = useSession();
  
  let disabledButton = true;
  if (session.status === "authenticated") {
    disabledButton = false;
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

  const [cartCount, setCartCount] = useState(0);
  const [showAddToCartButton, setShowAddToCartButton] = useState(false);
  
  const updateCartCount = (count: number) => {
    setCartCount((prevCount) => prevCount + count);
  }

  useEffect(() => {
    handleAddToCart();
  }, [cartCount]);

  const handleAddToCart = () => {
    if (cartCount > 0) {
      setShowAddToCartButton(true);
    }
    else {
      setShowAddToCartButton(false);
    }
  }

  return (
    <div className="">
      <div className="w-full min-h-screen mb-[50px] bg-backgroundcolor">
        <div className="container mx-auto max-w-screen-lg">
          <h1 className="font-bold text-3xl mt-[100px] font-raleway text-h2">Pakaian</h1>
          <div className="flex flex-row justify-between gap-6 items-end">
            <div className="flex items-center border border-black hover:bg-white rounded-md w-full px-4 mt-4 h-14">
              <FaSearch size={18} />
              <input
                type="text"
                placeholder="Cari Pakaian"
                className="px-4 py-2 outline-none bg-transparent w-full focus:ring-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>
            <Dropdown updateFilteredData={updateFilteredData} updateDataToOriginal={updateDataToOriginal} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {currentItems.map((pakaian: Pakaian) => (
              <PakaianComponent pakaian={pakaian} key={pakaian.id} updateCartCount={updateCartCount}  disabledButton={disabledButton} />
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

      {showAddToCartButton ? (
        <div className="fixed flex items-center bottom-8 left-[50%] translate-x-[-50%]">
          <Button text="Add to Cart" className="shadow-lg w-[300px] h-[40px]" type="secondary" />
          {/* Cart icon */}
          <Image
            src="/icons/cart-white.svg"
            width={20}
            height={21}
            alt={"Cart"}
            className="translate-x-[-200%]"
          />
        </div>
      ) : null}

    </div>
  )
}

export default KatalogPakaian