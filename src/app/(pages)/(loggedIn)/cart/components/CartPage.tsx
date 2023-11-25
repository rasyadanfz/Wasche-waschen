"use client";
import { useEffect, useState } from "react";
import { ClothesCartData } from "@/app/api/keranjang/[id]/route";
import CartCard from "./CartCard";
import CreateOrderButton from "./CreateOrderButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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

    const data = await res.json();

    return res;
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

export default function CartPage() {
    const session = useSession();
    if (!session.data) {
        redirect("/login");
    } else if (session.data.user.role !== "Customer") {
        redirect("/catalog");
    }

    const [dataKeranjang, setDataKeranjang] = useState<ClothesCartData[]>([]);
    const [countChange, setCountChange] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataKeranjang(session.data.user.id);
                setDataKeranjang(res);
            } catch (error) {
                console.error("Error fetching data : ", error);
            }
        };
        fetchData();
    }, [session.data.user.id]);

    const handleSubtract = (index: number) => {
        const newValues: ClothesCartData[] = [...dataKeranjang];
        const eachValue =
            newValues[index].total_harga / newValues[index].kuantitas;
        if (newValues[index].kuantitas > 0) {
            newValues[index].kuantitas -= 1;
            newValues[index].total_harga -= eachValue;
            setDataKeranjang(newValues);
        }
    };

    return (
        <>
            <div className="flex flex-col mt-[80px]">
                <div className="flex items-baseline">
                    <p className="font-black text-2xl mb-[20px] ml-[100px]">
                        Keranjang
                    </p>
                </div>
                <div>
                    {dataKeranjang.length === 0 ? (
                        <div className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] items-center justify-center">
                            <p className="font-black text-2xl">
                                Keranjang Kosong
                            </p>
                        </div>
                    ) : (
                        <div>
                            {dataKeranjang.map(
                                (item: ClothesCartData, index: number) => (
                                    <CartCard
                                        subtract={() => handleSubtract(index)}
                                        key={index}
                                        pakaianNama={item.pakaianNama}
                                        total_harga={item.total_harga}
                                        kuantitas={item.kuantitas}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div>
                {dataKeranjang.length !== 0 ? (
                    <div className="flex flex-row">
                        <CreateOrderButton
                            onClick={async () => {
                                await updateCart(
                                    dataKeranjang,
                                    session.data.user.id
                                );
                                setCountChange(countChange + 1);
                            }}
                            className="mt-[20px] ml-[1050px] mb-[50px] items-center justify-center px-4 py-2"
                            text="Update Keranjang"
                        />
                        <CreateOrderButton
                            onClick={async () => {
                                await createNewTransaction(
                                    session.data.user.id
                                );
                                setCountChange(countChange + 1);
                            }}
                            className="mt-[20px] ml-[50px] mb-[50px] items-center justify-center px-4 py-2"
                        />
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
>>>>>>> src/app/(pages)/(loggedIn)/cart/components/CartPage.tsx
}
