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
        <div id="katalog_pakaian">
            <div className="w-full min-h-screen mb-[50px] bg-backgroundcolor">
                <div className="container mx-auto max-w-screen-lg">
                    <h1 className="font-bold text-3xl mt-[100px] font-raleway text-h2">
                        Pakaian
                    </h1>
                    <div className="flex flex-row justify-between gap-6 items-end">
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
                        {admin && (
                            <button
                                className="font-semibold hover:cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center h-14 border border-black hover:bg-secondary-300 bg-secondary-400"
                                onClick={() => setIsCreateFormVisible(true)}
                            >
                                Create
                            </button>
                        )}
                    </div>
                    <div id="pakaian_card" className="grid grid-cols-4 gap-4">
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
