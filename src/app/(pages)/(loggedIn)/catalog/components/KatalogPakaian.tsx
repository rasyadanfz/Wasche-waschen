"use client";

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import PakaianComponent from "@/app/(pages)/(loggedIn)/catalog/components/PakaianComponent";
import { ExistingPakaian } from "@prisma/client";
import Pagination from "@/components/Pagination";
import Dropdown from "@/app/(pages)/(loggedIn)/catalog/components/Dropdown";
import { useSession } from "next-auth/react";
import CreateForm from "./CreateForm";
import AddToCart from "./AddToCart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

async function getDataPakaian() {
    const res = await fetch("/api/pakaian", {
        method: "GET",
    });

    const dataPakaian = await res.json();
    return dataPakaian;
}

const KatalogPakaian = () => {
    const session = useSession();
    const router = useRouter();

    let disabledButton = true;
    if (session.status === "authenticated") {
        disabledButton = false;
    }

    let admin = false;
    if (session.data?.user.role == "Admin") {
        admin = true;
    }

    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataPakaian, setDataPakaian] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState(dataPakaian);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const [pakaianInCart, setPakaianInCart] = useState<
        { [pakaianId: string]: number }[]
    >([]); // list of pakaian in cart
    const [cartCount, setCartCount] = useState(0);
    const [showAddToCartButton, setShowAddToCartButton] = useState(false);

    const onHandlePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDataPakaian();
            setDataPakaian(data);
            setFilteredData(data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const result = dataPakaian.filter((item: ExistingPakaian) => {
            const nameMatch = item.name
                .toLowerCase()
                .includes(query.toLowerCase());
            return nameMatch;
        });

        setFilteredData(result);
    };

    const updateFilteredData = (startPrices: number[], endPrices: number[]) => {
        const filter = startPrices.map((startPrice, index) => {
            const temp = dataPakaian.filter((item: ExistingPakaian) => {
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

    const updateCartCount = (count: number) => {
        setCartCount((prevCount) => prevCount + count);
    };

    const updatePakaianInCart = (pakaianId: string, pakaianCount: number) => {
        const existingItemIndex = pakaianInCart.findIndex(
            (item) => Object.keys(item)[0] === pakaianId
        );

        if (existingItemIndex !== -1) {
            const updatedCart = [...pakaianInCart];
            updatedCart[existingItemIndex][pakaianId] += pakaianCount;

            if (updatedCart[existingItemIndex][pakaianId] == 0) {
                updatedCart.splice(existingItemIndex, 1);
            }

            setPakaianInCart(updatedCart);
        } else {
            setPakaianInCart([...pakaianInCart, { [pakaianId]: pakaianCount }]);
        }
    };

    useEffect(() => {
        handleAddToCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartCount]);

    const handleAddToCart = () => {
        if (cartCount > 0) {
            setShowAddToCartButton(true);
        } else {
            setShowAddToCartButton(false);
        }
    };

    const closeCreateForm = () => {
        setIsCreateFormVisible(false);
    };

    const addToCart = async () => {
        // Send POST request to create orderlines
        const sendData = await fetch("/api/orderline", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: session.data?.user.id,
                pakaianInCart: pakaianInCart,
            }),
        });
        // Clear pakaianInCart and direct user to cart
        setPakaianInCart([]);
        toast.success("Berhasil menambahkan ke keranjang");
        setTimeout(() => {
            router.push("/cart");
        }, 1000);
    };

    return (
        <div id="katalog_pakaian" className="">
            <div className="min-h-screen mb-[50px] bg-backgroundcolor">
                <div className="container mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md pl-5 pr-10 sm:px-0">
                    <h1 className="font-bold text-h3 mt-[100px] font-raleway md:text-h2">
                        Pakaian
                    </h1>
                    <div className="flex flex-col md:flex-row md:justify-between gap-6 md:items-end">
                        <div className="flex justify-between gap-6 items-end grow">
                            <div className="flex items-center border border-black hover:bg-white rounded-md w-full px-4 mt-4 h-14">
                                <FaSearch size={18} />
                                <input
                                    id="search_bar"
                                    type="text"
                                    placeholder="Cari Pakaian"
                                    className="px-4 py-2 outline-none bg-transparent w-full focus:ring-1"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />
                            </div>
                            <div id="filter_dropdown">
                                <Dropdown
                                    updateFilteredData={updateFilteredData}
                                    updateDataToOriginal={updateDataToOriginal}
                                />
                            </div>
                        </div>
                        {admin && (
                            <button
                                id="create_button"
                                className="font-semibold mb-3 md:mb-0 hover:cursor-pointer text-white justify-center rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center h-14 border border-black hover:bg-secondary-300 bg-secondary-400"
                                onClick={() => setIsCreateFormVisible(true)}
                            >
                                Add New Pakaian
                            </button>
                        )}
                    </div>
                    {isLoading ? (
                        <div className="absolute translate-x-[-50%] translate-y-[-50%] animate-pulse top-[60%] left-[50%] text-h2  font-raleway font-bold">
                            <div>Loading...</div>
                        </div>
                    ) : (
                        <div
                            id="pakaian_card"
                            className="flex flex-col gap-y-3 md:grid md:grid-cols-5 md:gap-x-8"
                        >
                            {currentItems.map((pakaian: ExistingPakaian) => (
                                <PakaianComponent
                                    pakaian={pakaian}
                                    key={pakaian.id}
                                    updateCartCount={updateCartCount}
                                    updatePakaianInCart={updatePakaianInCart}
                                    disabledButton={disabledButton}
                                    admin={admin}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isCreateFormVisible && (
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <CreateForm closeCreateForm={closeCreateForm} />
                </div>
            )}

            <Pagination
                filteredData={filteredData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                paginate={onHandlePage}
            />

            {showAddToCartButton && (
                <div>
                    <AddToCart
                        pakaianInCart={pakaianInCart}
                        onClick={addToCart}
                    />
                </div>
            )}
        </div>
    );
};

export default KatalogPakaian;
