"use client";
import { useEffect, useState } from "react";
import { ClothesCartData } from "@/app/api/keranjang/[id]/route";
import CartCard from "./CartCard";
import CreateOrderButton from "./CreateOrderButton";
import { Session } from "next-auth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import TotalHargaCart from "./TotalHargaCart";
import { errorToastOptions, successToastOptions } from "@/toastConfig";

function calculateTotalHarga(arr: ClothesCartData[]) {
    var sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i].total_harga;
    return sum;
}

async function updateCart(newCart: ClothesCartData[], userId: string) {
    const res = await fetch("/api/keranjang", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify({
            userId: userId,
            ClothesCartData: newCart,
        }),
    });

    const data = await res.json();

    return res;
}

async function createNewTransaction(userId: string) {
    const res = await fetch("/api/transaksi/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify({
            userId: userId,
        }),
    });

    console.log(res);

    const data = await res.json();

    return data;
}

async function getDataKeranjang(userId: string) {
    const res = await fetch(`/api/keranjang/${userId}`, {
        method: "GET",
    });

    let dataKeranjang;
    if (res !== undefined) dataKeranjang = await res.json();
    else dataKeranjang = [];

    return dataKeranjang.cartClothesData;
}

export default function CartPage({ session }: { session: Session }) {
    const router = useRouter();
    const [dataKeranjang, setDataKeranjang] = useState<ClothesCartData[]>([]);
    const [countChange, setCountChange] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPriceCart, setPriceCart] = useState(0);
    const [isChanged, setisChanged] = useState(false);

    useEffect(() => {
        // fetch totalPriceCart with utils
        setPriceCart(calculateTotalHarga(dataKeranjang));
    }, [dataKeranjang]);

    // useEffect(()=>{
    //     setisChanged(true)
    // },[dataKeranjang]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataKeranjang(session!.user.id);
                setDataKeranjang(res);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data : ", error);
            }
        };
        fetchData();
    }, []);

    const handleSubtract = (index: number) => {
        const newValues: ClothesCartData[] = [...dataKeranjang];
        const eachValue =
            newValues[index].total_harga / newValues[index].kuantitas;
        if (newValues[index].kuantitas > 0) {
            newValues[index].kuantitas -= 1;
            newValues[index].total_harga -= eachValue;
            setDataKeranjang(newValues);
        }
        setisChanged(true);
    };

    return (
        <div id="keranjang_cart">
            {isLoading ? (
                <div className="absolute translate-x-[-50%] translate-y-[-50%] animate-pulse top-[50%] left-[50%] text-h2  font-raleway font-bold">
                    <div>Loading...</div>
                </div>
            ) : (
                <div className="container mx-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md px-5 sm:px-0">
                    <div className="success_toast">
                        <Toaster toastOptions={successToastOptions} />
                    </div>
                    <div className="flex flex-col mt-[100px]">
                        <div className="flex items-baseline">
                            <p className="font-bold text-h3 md:text-h2 font-raleway mb-[20px]">
                                Keranjang
                            </p>
                        </div>
                        <div>
                            {dataKeranjang.length === 0 ? (
                                <div className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] items-center justify-center">
                                    <p className="font-semibold text-h5 md:text-h4 font-raleway">
                                        Keranjang Kosong
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        {dataKeranjang.map(
                                            (
                                                item: ClothesCartData,
                                                index: number
                                            ) => (
                                                <CartCard
                                                    subtract={() =>
                                                        handleSubtract(index)
                                                    }
                                                    key={index}
                                                    pakaianNama={
                                                        item.pakaianNama
                                                    }
                                                    total_harga={
                                                        item.total_harga
                                                    }
                                                    kuantitas={item.kuantitas}
                                                />
                                            )
                                        )}
                                    </div>
                                    <div className="flex justify-end ">
                                        <TotalHargaCart
                                            total_harga={totalPriceCart}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            {dataKeranjang.length !== 0 ? (
                                <div className="flex flex-row justify-between md:justify-end md:gap-x-[50px]">
                                    <CreateOrderButton
                                        onClick={async () => {
                                            await updateCart(
                                                dataKeranjang,
                                                session!.user.id
                                            );
                                            setCountChange(countChange + 1);
                                            toast.success(
                                                "Barang berhasil diubah!"
                                            );
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1500);
                                        }}
                                        className="items-center justify-center px-4 py-2 font-bold text-white"
                                        text="Update Keranjang"
                                    />
                                    <CreateOrderButton
                                        onClick={async () => {
                                            await createNewTransaction(
                                                session!.user.id
                                            );
                                            setCountChange(countChange + 1);
                                            toast.success(
                                                "Pesanan berhasil dibuat!"
                                            );
                                            setTimeout(() => {
                                                router.push(
                                                    "/riwayat-transaksi"
                                                );
                                            }, 1500);
                                        }}
                                        disabled={isChanged}
                                        className={`items-center justify-center px-4 py-2 font-bold text-white ${
                                            isChanged
                                                ? "hover:cursor-not-allowed bg-primary-400 hover:bg-primary-400"
                                                : ""
                                        }`}
                                    />
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
